import prisma from '../config/db.js';
class InvoiceRepository {
  create = async ({ paymentId, note }) => {
    const invoiceNo = 'INV-' + Date.now();
    return prisma.invoice.create({ data: { paymentId, invoiceNo, note }, include: { payment: true } });
  }
  findById = async ({ id }) => prisma.invoice.findUnique({ where: { id }, include: { payment: { include: { membershipSubscription: { include: { memberProfile: { include: { user: true } }, membershipPlan: true } } } } } });
  findByPayment = async ({ paymentId }) => prisma.invoice.findUnique({ where: { paymentId }, include: { payment: true } });
  getAll = async ({ page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;
    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({ skip, take: limit, include: { payment: true }, orderBy: { issuedAt: 'desc' } }),
      prisma.invoice.count(),
    ]);
    return { invoices, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
}
export default InvoiceRepository;
