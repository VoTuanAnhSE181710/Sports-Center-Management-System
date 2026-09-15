class NotificationService {
  #notificationRepository;
  constructor({ notificationRepository }) { this.#notificationRepository = notificationRepository; }
  send = async ({ userId, title, body, type }) => this.#notificationRepository.create({ userId, title, body, type: type || 'GENERAL' });
  getByUser = async ({ userId, page, limit }) => this.#notificationRepository.getByUser({ userId, page, limit });
  markRead = async ({ id }) => this.#notificationRepository.markRead({ id });
  markAllRead = async ({ userId }) => this.#notificationRepository.markAllRead({ userId });
}
export default NotificationService;
