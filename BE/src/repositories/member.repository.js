import prisma from '../config/db.js';

class MemberRepository {
  findByUserId = async ({ userId }) =>
    prisma.memberProfile.findUnique({ where: { userId }, include: { user: { include: { role: true } } } });

  findById = async ({ id }) =>
    prisma.memberProfile.findUnique({ where: { id }, include: { user: { include: { role: true } } } });

  create = async ({ userId, dateOfBirth, gender, address, fitnessGoal, trainingLevel, healthNote }) =>
    prisma.memberProfile.create({ data: { userId, dateOfBirth, gender, address, fitnessGoal, trainingLevel, healthNote }, include: { user: true } });

  update = async ({ id, data }) =>
    prisma.memberProfile.update({ where: { id }, data, include: { user: { include: { role: true } } } });

  getAll = async ({ page = 1, limit = 10, search }) => {
    const skip = (page - 1) * limit;
    const where = search ? { user: { OR: [{ fullName: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }, { phone: { contains: search } }] } } : {};
    const [members, total] = await Promise.all([
      prisma.memberProfile.findMany({ where, skip, take: limit, include: { user: { include: { role: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.memberProfile.count({ where }),
    ]);
    return { members, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
}
export default MemberRepository;
