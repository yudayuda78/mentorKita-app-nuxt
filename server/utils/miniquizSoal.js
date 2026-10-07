const VALID_OPTIONS = ['A', 'B', 'C', 'D', 'E']

function numOrNull(v) {
  if (v === undefined || v === null || v === '') return null
  const n = parseInt(v)
  return isNaN(n) ? null : n
}

function strOrNull(v) {
  if (v === undefined || v === null) return null
  const s = String(v)
  return s.length ? s : null
}

// Bangun objek data soal mini quiz dari body (dipakai POST & PUT).
export function buildMiniquizSoalData(body, { partial = false } = {}) {
  const data = {}
  const has = (k) => body[k] !== undefined

  if (!partial || has('nomorSoal')) data.nomorSoal = numOrNull(body.nomorSoal)
  if (!partial || has('question')) data.question = String(body.question ?? '').trim()
  if (!partial || has('questionImage')) data.questionImage = strOrNull(body.questionImage)

  for (const opt of VALID_OPTIONS) {
    const key = `option${opt}`
    const imgKey = `option${opt}Image`
    if (!partial || has(key)) data[key] = strOrNull(body[key])
    if (!partial || has(imgKey)) data[imgKey] = strOrNull(body[imgKey])
  }

  if (!partial || has('correctOption')) {
    data.correctOption = VALID_OPTIONS.includes(body.correctOption) ? body.correctOption : null
  }
  if (!partial || has('correctEssay')) data.correctEssay = strOrNull(body.correctEssay)
  if (!partial || has('pembahasan')) data.pembahasan = strOrNull(body.pembahasan)

  return data
}
