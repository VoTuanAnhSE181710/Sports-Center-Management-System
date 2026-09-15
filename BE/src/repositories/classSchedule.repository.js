import prisma from '../config/db.js';
class ClassScheduleRepository {
  getByClass = async ({ classId }) => prisma.classSchedule.findMany({ where: { classId }, include: { room: true } });
  findById = async ({ id }) => prisma.classSchedule.findUnique({ where: { id }, include: { class: true, room: true } });
  create = async (data) => prisma.classSchedule.create({ data, include: { room: true } });
  update = async ({ id, data }) => prisma.classSchedule.update({ where: { id }, data });
  delete = async ({ id }) => prisma.classSchedule.update({ where: { id }, data: { isActive: false } });
  checkRoomConflict = async ({ roomId, dayOfWeek, startTime, endTime, excludeId }) => {
    const where = { roomId, dayOfWeek, isActive: true, AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }] };
    if (excludeId) where.id = { not: excludeId };
    return prisma.classSchedule.findFirst({ where });
  }
  checkCoachConflict = async ({ coachProfileId, dayOfWeek, startTime, endTime, excludeId }) => {
    const where = { class: { coachProfileId }, dayOfWeek, isActive: true, AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }] };
    if (excludeId) where.id = { not: excludeId };
    return prisma.classSchedule.findFirst({ where, include: { class: true } });
  }
}
export default ClassScheduleRepository;
