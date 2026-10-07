export function generateSlug(input) {
  return String(input ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Pastikan slug unik. `findExisting(slug)` harus mengembalikan record/null.
export async function uniqueSlug(base, findExisting, excludeId = null) {
  let slug = base || `item-${Date.now()}`
  let candidate = slug
  let i = 1

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await findExisting(candidate)
    if (!existing || (excludeId && existing.id === excludeId)) return candidate
    candidate = `${slug}-${i++}`
  }
}
