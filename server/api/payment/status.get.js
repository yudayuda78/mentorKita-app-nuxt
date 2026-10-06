import prisma from "../../prisma/client.js"

const THROTTLE_MS = 10 * 1000

export default defineEventHandler(async (event) => {
  const user = await getUserFromToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Silakan login terlebih dahulu.' })
  }

  const query = getQuery(event)
  const orderId = query.orderId
  if (!orderId) {
    throw createError({ statusCode: 400, statusMessage: 'orderId wajib diisi.' })
  }

  const payment = await prisma.paymentSnbtTryout.findFirst({
    where: { orderId, userId: user.id },
  })
  if (!payment) {
    throw createError({ statusCode: 404, statusMessage: 'Invoice tidak ditemukan.' })
  }

  if (payment.isPaid) {
    return {
      status: 'success',
      data: {
        paymentStatus: 'paid',
        isPaid: true,
        totalAmount: payment.totalAmount,
        paidAt: payment.paidAt,
      },
    }
  }

  const now = new Date()
  const lastChecked = payment.statusCheckedAt ? new Date(payment.statusCheckedAt) : null
  const fresh = lastChecked && now - lastChecked < THROTTLE_MS

  if (fresh) {
    return {
      status: 'success',
      data: {
        paymentStatus: payment.status,
        isPaid: payment.isPaid,
        totalAmount: payment.totalAmount,
        cached: true,
      },
    }
  }

  let invoice
  try {
    invoice = await getInvoiceByOrder(event, orderId)
  } catch (error) {
    return {
      status: 'success',
      data: {
        paymentStatus: payment.status,
        isPaid: payment.isPaid,
        totalAmount: payment.totalAmount,
        cached: true,
        retryAfter: error?.statusCode === 429 ? 10 : null,
      },
    }
  }

  const newStatus = invoice?.status || 'pending'
  const data = { status: newStatus, statusCheckedAt: now }

  if (newStatus === 'paid') {
    data.isPaid = true
    data.paidAt = invoice.paid_at ? new Date(invoice.paid_at) : now
  }
  if (invoice?.total_amount != null) data.totalAmount = invoice.total_amount
  if (invoice?.unique_code != null) data.uniqueCode = invoice.unique_code
  if (invoice?.qris_payload && !payment.qrisPayload) data.qrisPayload = invoice.qris_payload

  const updated = await prisma.paymentSnbtTryout.update({
    where: { id: payment.id },
    data,
  })

  return {
    status: 'success',
    data: {
      paymentStatus: updated.status,
      isPaid: updated.isPaid,
      totalAmount: updated.totalAmount,
      paidAt: updated.paidAt,
    },
  }
})
