import prisma from '../config/db.js';
class SupportRequestRepository {
  create = async ({ memberProfileId, subject, message }) => prisma.supportRequest.create({ data: { memberProfileId, subject, message } });
  findById = async ({ id }) => prisma.supportRequest.findUnique({ where: { id }, include: { memberProfile: { include: { user: true } } } });
  getAll = async ({ page = 1, limit = 10, status }) => {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};
    const [requests, total] = await Promise.all([
      prisma.supportRequest.findMany({ where, skip, take: limit, include: { memberProfile: { include: { user: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.supportRequest.count({ where }),
    ]);
    return { requests, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
  updateStatus = async ({ id, status, resolvedNote }) => prisma.supportRequest.update({ where: { id }, data: { status, resolvedNote } });
}
export default SupportRequestRepository;
