export default defineEventHandler(async() => {

    const tryout = await prisma.snbtTryout.findMany({
        include : {
            paymentsSnbt : true
        }
    })

    const tryoutsWithCounts = tryout.map(t => {
    const paidCount = t.paymentsSnbt.filter(p => p.isPaid === true).length;
    const unpaidCount = t.paymentsSnbt.filter(p => p.isPaid === false).length;

    const { paymentsSnbt, ...dataWithoutPayments } = t

    return {
    ...dataWithoutPayments,
    paidCount,
    unpaidCount
  };
  });

  return tryoutsWithCounts;
})