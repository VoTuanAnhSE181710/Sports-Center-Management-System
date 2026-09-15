import prisma from '../config/db.js';
class NotificationRepository {
  create = async ({ userId, title, body, type }) => prisma.notification.create({ data: { userId, title, body, type } });
  getByUser = async ({ userId, page = 1, limit = 20 }) => {
    const skip = (page - 1) * limit;
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({ where: { userId }, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.notification.count({ where: { userId } }),
    ]);
    return { notifications, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }
  markRead = async ({ id }) => prisma.notification.update({ where: { id }, data: { isRead: true } });
  markAllRead = async ({ userId }) => prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
}
export default NotificationRepository;
