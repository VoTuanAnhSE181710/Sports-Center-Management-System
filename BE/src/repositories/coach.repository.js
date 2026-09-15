import prisma from '../config/db.js';

class CoachRepository {
  findByUserId = async ({ userId }) =>
    prisma.coachProfile.findUnique({ where: { userId }, include: { user: { include: { role: true } } } });

  findById = async ({ id }) =>
    prisma.coachProfile.findUnique({ where: { id }, include: { user: { include: { role: true } } } });

  create = async ({ userId, specialization, experience, bio }) =>
    prisma.coachProfile.create({ data: { userId, specialization, experience, bio }, include: { user: true } });

  update = async ({ id, data }) =>
    prisma.coachProfile.update({ where: { id }, data, include: { user: { include: { role: true } } } });

  getAll = async ({ page = 1, limit = 10, search }) => {
    const skip = (page - 1) * limit;
    const where = search ? { user: { OR: [{ fullName: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }] } } : {};
    const [coaches, total] = await Promise.all([
      prisma.coachProfile.findMany({ where, skip, take: limit, include: { user: { include: { role: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.coachProfile.count({ where }),
    ]);
    return { coaches, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
}
export default CoachRepository;
