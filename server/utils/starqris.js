import QRCode from 'qrcode'

const ERROR_MESSAGES = {
  401: 'API Key StarQRIS tidak valid atau belum benar.',
  402: 'Batas plan StarQRIS tercapai (device/transaksi).',
  403: 'Akses StarQRIS ditolak.',
  409: 'Invoice/pembayaran duplikat di StarQRIS.',
  422: 'Data invoice tidak valid.',
  429: 'Rate limit StarQRIS terlampaui, coba beberapa saat lagi.',
}

function getConfig(event) {
  const config = useRuntimeConfig(event)
  return {
    baseUrl: (config.starqrisBaseUrl || 'https://starqris.web.id/api/v1').replace(/\/+$/, ''),
    apiKey: config.starqrisApiKey || process.env.STARQRIS_API_KEY || '',
  }
}

async function starqrisRequest(event, path, { method = 'GET', body } = {}) {
  const { baseUrl, apiKey } = getConfig(event)

  if (!apiKey || apiKey.includes('PLACEHOLDER')) {
    throw createError({
      statusCode: 503,
      statusMessage: 'API Key StarQRIS belum dikonfigurasi. Isi STARQRIS_API_KEY di .env.',
    })
  }

  try {
    return await $fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    })
  } catch (error) {
    const status = error?.response?.status || error?.statusCode || 502
    const message =
      ERROR_MESSAGES[status] ||
      error?.data?.message ||
      error?.data?.statusMessage ||
      'Gagal menghubungi StarQRIS.'
    throw createError({ statusCode: status, statusMessage: message, data: error?.data })
  }
}

export async function starqrisHealth(event) {
  const { baseUrl } = getConfig(event)
  const healthUrl = `${new URL(baseUrl).origin}/up`
  try {
    await $fetch(healthUrl, { method: 'GET' })
    return { ok: true }
  } catch (error) {
    return { ok: false, status: error?.response?.status || null }
  }
}

export async function createInvoice(event, { orderId, amount, description, expirationHours = 24 }) {
  const res = await starqrisRequest(event, '/invoices', {
    method: 'POST',
    body: {
      order_id: orderId,
      amount,
      description,
      expiration_hours: expirationHours,
    },
  })
  return res?.invoice || res
}

export async function getInvoiceByOrder(event, orderId) {
  const res = await starqrisRequest(event, `/invoices/by-order/${encodeURIComponent(orderId)}`)
  return res?.invoice || res
}

export async function getQrisAccounts(event) {
  return await starqrisRequest(event, '/qris-accounts')
}

export async function ensureQrisImage(invoice) {
  if (invoice?.qris_base64) return invoice.qris_base64
  if (!invoice?.qris_payload) return null
  try {
    return await QRCode.toDataURL(invoice.qris_payload, { margin: 1, width: 320 })
  } catch {
    return null
  }
}
