export async function updateSoalDifficulty() {
  const soalList = await prisma.snbtSoal.findMany()

  for (const soal of soalList) {
    const total = await prisma.answerSnbtUser.count({
      where: { soalId: soal.id },
    })

    const benar = await prisma.answerSnbtUser.count({
      where: { soalId: soal.id, benar: true },
    })

    if (total === 0) continue

    const difficulty = parseFloat((1 - benar / total).toFixed(2)) // b
    const discrimination = 1.0 // a, bisa dibuat lebih dinamis nanti

    await prisma.snbtSoal.update({
      where: { id: soal.id },
      data: { difficulty, discrimination },
    })
  }
}

export async function calculateIRTScore(userId, materiId) {
  // Ambil data user & thetanya
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { thetaGlobal: true },
  });

  const theta = user?.thetaGlobal ?? 0.0;

  // Ambil jawaban dan soalnya
  const jawaban = await prisma.answerSnbtUser.findMany({
    where: {
      userId: Number(userId),
      soal: {
        snbtMateriId: Number(materiId),
      },
    },
    include: {
      soal: true,
    },
  });

  let rawScore = 0;

  for (const j of jawaban) {
    const soal = j.soal;
    const a = soal.discrimination ?? 1.0;
    const b = soal.difficulty ?? 0.5;
    const c = soal.guessing ?? 0.2;

    const p = c + ((1 - c) / (1 + Math.exp(-a * (theta - b))));
    if (j.benar) {
      rawScore += p;
    }
  }

  const maxRaw = jawaban.length;
  const normScore = 200 + ((rawScore / maxRaw) * 700); // 200–900



 

  return {
    theta: parseFloat(theta.toFixed(4)),
    rawScore: parseFloat(rawScore.toFixed(4)),
    score: Math.round(normScore),
  };
}

export async function averageglobaltheta(userId){
  const allGlobalTheta = await prisma.scoreSnbt.findMany({
    where: {
      userId : userId
    },
    select: {
      theta: true
    }
  })

  const thetaValue = allGlobalTheta.map(item => item.theta)
  const averageTheta = thetaValue.length ? thetaValue.reduce((sum, val) => sum + val, 0) : 0

  const update = await prisma.user.update({
    where: {id: userId},
    data : {thetaGlobal: averageTheta}
  })
}

export async function finalScore(userId, tryoutId){
  const tryoutTPS = await prisma.scoreSnbt.findMany({
    where : {
      userId,
      snbtTryoutId: tryoutId,
      type : 'TES_PORTENSI_SKOLASTIK'
    },
    select:{
      score: true
    }
  })

  const tryoutLiterasi = await prisma.scoreSnbt.findMany({
    where : {
      userId,
      snbtTryoutId: tryoutId,
      type : 'TES_LITERASI'
    },
    select:{
      score: true
    }
  })

  const tryoutTPSValue = tryoutTPS.map(item => item.score)
  const tryoutLiterasiValue = tryoutLiterasi.map(item => item.score)

  const averageTPS = tryoutTPSValue.length ? tryoutTPSValue.reduce((sum, val) => sum + val, 0) / tryoutTPSValue.length : 0
  const averageLiterasi = tryoutLiterasiValue.length ? tryoutLiterasiValue.reduce((sum, val) => sum + val, 0) / tryoutLiterasiValue.length : 0
  const final = (averageTPS * 0.6) + (averageLiterasi * 0.4)


  if (tryoutTPSValue.length === 4 && tryoutLiterasiValue.length === 3) {
    await prisma.snbtFinalScore.upsert({
      where: {
        userId_snbtTryoutId: {
          userId,
          snbtTryoutId: tryoutId,
        },
      },
      update: {
        score: final,
      },
      create: {
        userId,
        snbtTryoutId: tryoutId,
        score: final,
      },
    })
  }
  


}

