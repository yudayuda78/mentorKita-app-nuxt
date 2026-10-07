const VALID_TYPES = ['PILIHAN_GANDA', 'ESAI']
const VALID_OPTIONS = ['A', 'B', 'C', 'D', 'E']

function numOrNull(v) {
  if (v === undefined || v === null || v === '') return null
  const n = parseFloat(v)
  return isNaN(n) ? null : n
}

function strOrNull(v) {
  if (v === undefined || v === null) return null
  const s = String(v)
  return s.length ? s : null
}

// Bangun objek data soal SNBT dari body (dipakai POST & PUT).
// `partial` = true untuk update (hanya field yang dikirim yang diubah).
export function buildSoalData(body, { partial = false } = {}) {
  const data = {}
  const has = (k) => body[k] !== undefined

  if (!partial || has('nomorSoal')) data.nomorSoal = numOrNull(body.nomorSoal)

  if (!partial || has('type')) {
    data.type = VALID_TYPES.includes(body.type) ? body.type : 'PILIHAN_GANDA'
  }

  if (!partial || has('question')) data.question = String(body.question ?? '').trim()
  if (!partial || has('questionImage')) data.questionImage = strOrNull(body.questionImage)
  if (!partial || has('materiSoal')) data.materiSoal = strOrNull(body.materiSoal)

  for (const opt of VALID_OPTIONS) {
    const key = `option${opt}`
    const imgKey = `option${opt}Image`
    if (!partial || has(key)) data[key] = strOrNull(body[key])
    if (!partial || has(imgKey)) data[imgKey] = strOrNull(body[imgKey])
  }

  const type = data.type ?? body.type
  if (!partial || has('correctOption') || has('type')) {
    data.correctOption =
      type === 'ESAI' ? null : (VALID_OPTIONS.includes(body.correctOption) ? body.correctOption : null)
  }
  if (!partial || has('correctEssay') || has('type')) {
    data.correctEssay = type === 'ESAI' ? strOrNull(body.correctEssay) : null
  }

  if (!partial || has('difficulty')) data.difficulty = numOrNull(body.difficulty)
  if (!partial || has('discrimination')) data.discrimination = numOrNull(body.discrimination)
  if (!partial || has('guessing')) {
    const g = numOrNull(body.guessing)
    data.guessing = g === null ? 0.2 : g
  }

  return data
}
