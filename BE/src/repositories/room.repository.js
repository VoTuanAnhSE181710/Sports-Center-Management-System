import prisma from '../config/db.js';
class RoomRepository {
  getAll = async ({ includeInactive = false } = {}) => prisma.room.findMany({ where: includeInactive ? {} : { isActive: true }, orderBy: { name: 'asc' } });
  findById = async ({ id }) => prisma.room.findUnique({ where: { id }, include: { classSchedules: true } });
  create = async (data) => prisma.room.create({ data });
  update = async ({ id, data }) => prisma.room.update({ where: { id }, data });
  delete = async ({ id }) => prisma.room.update({ where: { id }, data: { isActive: false } });
}
export default RoomRepository;
