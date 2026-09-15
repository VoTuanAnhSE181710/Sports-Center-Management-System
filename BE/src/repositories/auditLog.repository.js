import prisma from '../config/db.js';

class AuditLogRepository {
  saveLog = async ({ actorId, action, targetType, targetId, outcome, details, ipAddress }) =>
    prisma.auditLog.create({ data: { actorId, action, targetType, targetId, outcome, details, ipAddress } });

  getLogs = async ({ page = 1, limit = 20, actorId, action, targetType, outcome }) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (actorId) where.actorId = actorId;
    if (action) where.action = action;
    if (targetType) where.targetType = targetType;
    if (outcome) where.outcome = outcome;
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({ where, skip, take: limit, include: { actor: { select: { id: true, fullName: true, email: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.auditLog.count({ where }),
    ]);
    return { logs, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
}
export default AuditLogRepository;
