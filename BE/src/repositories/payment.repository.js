import prisma from '../config/db.js';
class PaymentRepository {
  create = async ({ membershipSubscriptionId, amount, method, note, createdBy }) =>
    prisma.payment.create({ data: { membershipSubscriptionId, amount, method, note, createdBy, status: 'COMPLETED' }, include: { membershipSubscription: { include: { membershipPlan: true } } } });
  findById = async ({ id }) => prisma.payment.findUnique({ where: { id }, include: { invoice: true, membershipSubscription: true } });
  getAll = async ({ page = 1, limit = 10, status, method }) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (status) where.status = status;
    if (method) where.method = method;
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({ where, skip, take: limit, include: { invoice: true, membershipSubscription: { include: { membershipPlan: true, memberProfile: { include: { user: true } } } } }, orderBy: { createdAt: 'desc' } }),
      prisma.payment.count({ where }),
    ]);
    return { payments, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
  updateStatus = async ({ id, status }) => prisma.payment.update({ where: { id }, data: { status } });
  getRevenueReport = async ({ startDate, endDate }) => {
    const where = { status: 'COMPLETED', createdAt: { gte: startDate, lte: endDate } };
    const payments = await prisma.payment.findMany({ where, select: { amount: true, method: true, createdAt: true } });
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    return { total, count: payments.length, payments };
  }
}
export default PaymentRepository;
