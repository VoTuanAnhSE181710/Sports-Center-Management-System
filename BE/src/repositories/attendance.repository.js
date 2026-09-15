import prisma from '../config/db.js';
class AttendanceRepository {
  checkIn = async ({ memberProfileId, classScheduleId, note }) =>
    prisma.attendance.create({ data: { memberProfileId, classScheduleId, note }, include: { classSchedule: { include: { class: true } } } });
  findOne = async ({ memberProfileId, classScheduleId }) =>
    prisma.attendance.findUnique({ where: { memberProfileId_classScheduleId: { memberProfileId, classScheduleId } } });
  getByMember = async ({ memberProfileId, page = 1, limit = 20 }) => {
    const skip = (page - 1) * limit;
    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({ where: { memberProfileId }, skip, take: limit, include: { classSchedule: { include: { class: { include: { sport: true } } } } }, orderBy: { checkedInAt: 'desc' } }),
      prisma.attendance.count({ where: { memberProfileId } }),
    ]);
    return { attendances, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
  getBySchedule = async ({ classScheduleId }) =>
    prisma.attendance.findMany({ where: { classScheduleId }, include: { memberProfile: { include: { user: true } } } });
}
export default AttendanceRepository;
