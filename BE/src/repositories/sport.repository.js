import prisma from '../config/db.js';
class SportRepository {
  getAll = async ({ includeInactive = false } = {}) => prisma.sport.findMany({ where: includeInactive ? {} : { isActive: true }, orderBy: { name: 'asc' } });
  findById = async ({ id }) => prisma.sport.findUnique({ where: { id } });
  create = async (data) => prisma.sport.create({ data });
  update = async ({ id, data }) => prisma.sport.update({ where: { id }, data });
  delete = async ({ id }) => prisma.sport.update({ where: { id }, data: { isActive: false } });
}
export default SportRepository;
