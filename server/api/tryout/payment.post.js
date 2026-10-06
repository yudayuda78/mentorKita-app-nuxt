import prisma from "../../prisma/client.js"

function buildResponse(payment, isPaid = false) {
  return {
    status: 'success',
    data: {
      orderId: payment.orderId,
      amount: payment.amount,
      totalAmount: payment.totalAmount,
      uniqueCode: payment.uniqueCode,
      qrisFee: payment.qrisFee,
      invoiceNumber: payment.invoiceNumber,
      qrisPayload: payment.qrisPayload,
      qrisBase64: payment.qrisBase64,
      expiresAt: payment.expiresAt,
      paymentStatus: isPaid ? 'paid' : payment.status,
      isPaid: payment.isPaid,
    },
  }
}

export default defineEventHandler(async (event) => {
  const user = await getUserFromToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Silakan login terlebih dahulu.' })
  }

  const body = await readBody(event)
  const { snbtTryoutId, snbtTryoutName } = body
  const tryoutId = parseInt(snbtTryoutId)

  if (!tryoutId || isNaN(tryoutId)) {
    throw createError({ statusCode: 400, statusMessage: 'snbtTryoutId wajib diisi.' })
  }

  const tryout = await prisma.snbtTryout.findUnique({ where: { id: tryoutId } })
  if (!tryout) {
    throw createError({ statusCode: 404, statusMessage: 'Tryout tidak ditemukan.' })
  }
  if (!tryout.price || tryout.price <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Harga tryout belum diatur.' })
  }

  const orderId = `MK-TRY-${tryoutId}-${user.id}`

  let payment = await prisma.paymentSnbtTryout.findFirst({
    where: { userId: user.id, snbtTryoutId: tryoutId },
  })

  if (!payment) {
    payment = await prisma.paymentSnbtTryout.create({
      data: {
        userId: user.id,
        snbtTryoutId: tryoutId,
        snbtMateri: snbtTryoutName || tryout.name || `Tryout ${tryoutId}`,
        orderId,
        amount: tryout.price,
        status: 'pending',
      },
    })
  }

  if (payment.isPaid) {
    return buildResponse(payment, true)
  }

  const now = new Date()
  const reusable =
    payment.qrisPayload &&
    payment.expiresAt &&
    new Date(payment.expiresAt) > now &&
    payment.orderId === orderId

  if (reusable) {
    return buildResponse(payment)
  }

  const invoice = await createInvoice(event, {
    orderId,
    amount: tryout.price,
    description: `Tryout ${tryout.name || tryoutId}`,
    expirationHours: 24,
  })

  const qrisBase64 = await ensureQrisImage(invoice)

  const updated = await prisma.paymentSnbtTryout.update({
    where: { id: payment.id },
    data: {
      orderId: invoice.order_id || orderId,
      amount: invoice.amount ?? tryout.price,
      totalAmount: invoice.total_amount ?? null,
      uniqueCode: invoice.unique_code ?? null,
      qrisFee: invoice.qris_fee ?? null,
      invoiceNumber: invoice.invoice_number || null,
      qrisPayload: invoice.qris_payload || null,
      qrisBase64,
      status: invoice.status || 'pending',
      expiresAt: invoice.expires_at ? new Date(invoice.expires_at) : null,
      statusCheckedAt: now,
    },
  })

  return buildResponse(updated)
})
