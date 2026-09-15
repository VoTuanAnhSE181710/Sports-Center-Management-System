import { StatusCodes } from 'http-status-codes';
class NotificationController {
  #notificationService; constructor({ notificationService }) { this.#notificationService = notificationService; }
  getMyNotifications = async (req, res) => { const { page=1, limit=20 } = req.query; const r = await this.#notificationService.getByUser({ userId: req.user.userId, page:+page, limit:+limit }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  markRead = async (req, res) => { const r = await this.#notificationService.markRead({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  markAllRead = async (req, res) => { await this.#notificationService.markAllRead({ userId: req.user.userId }); res.status(StatusCodes.OK).json({ status: 'success', message: 'All notifications marked as read' }); }
}
export default NotificationController;
