const tokenMap = new Map()

export function generateToken(){
    return Math.random().toString(36).substring(2, 15)
}

export async function saveToken(email, token){
    tokenMap.set(email, {token, expires: Date.now() + 15 * 60 * 1000})
}

export async function verifyToken(email, token) {
  const data = tokenMap.get(email)
  if (!data) return false
  return data.token === token && Date.now() < data.expires
}

export async function removeToken(email) {
  tokenMap.delete(email)
}