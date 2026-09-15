import prisma from '../config/db.js';
class ClassRepository {
  getAll = async ({ page = 1, limit = 10, sportId, coachProfileId, status } = {}) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (sportId) where.sportId = sportId;
    if (coachProfileId) where.coachProfileId = coachProfileId;
    if (status) where.status = status;
    const [classes, total] = await Promise.all([
      prisma.class.findMany({ where, skip, take: limit, include: { sport: true, coachProfile: { include: { user: true } }, classSchedules: { include: { room: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.class.count({ where }),
    ]);
    return { classes, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
  findById = async ({ id }) => prisma.class.findUnique({ where: { id }, include: { sport: true, coachProfile: { include: { user: true } }, classSchedules: { include: { room: true } }, enrollments: true } });
  create = async (data) => prisma.class.create({ data, include: { sport: true, coachProfile: { include: { user: true } } } });
  update = async ({ id, data }) => prisma.class.update({ where: { id }, data, include: { sport: true, coachProfile: { include: { user: true } } } });
  assignCoach = async ({ classId, coachProfileId }) => prisma.class.update({ where: { id: classId }, data: { coachProfileId }, include: { coachProfile: { include: { user: true } } } });
  countEnrolled = async ({ classId }) => prisma.enrollment.count({ where: { classId, status: 'ENROLLED' } });
}
export default ClassRepository;
