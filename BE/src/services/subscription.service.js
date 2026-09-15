import { BadRequestError, NotFoundError } from '../error/error.js';
class SubscriptionService {
  #subscriptionRepository; #membershipPlanRepository; #memberRepository; #paymentRepository; #invoiceRepository;
  constructor({ subscriptionRepository, membershipPlanRepository, memberRepository, paymentRepository, invoiceRepository }) {
    this.#subscriptionRepository = subscriptionRepository; this.#membershipPlanRepository = membershipPlanRepository;
    this.#memberRepository = memberRepository; this.#paymentRepository = paymentRepository; this.#invoiceRepository = invoiceRepository;
  }
  register = async ({ memberProfileId, membershipPlanId, paymentMethod, createdBy }) => {
    const plan = await this.#membershipPlanRepository.findById({ id: membershipPlanId });
    if (!plan || !plan.isActive) throw new NotFoundError('Membership plan not found or inactive');
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);
    const subscription = await this.#subscriptionRepository.create({ memberProfileId, membershipPlanId, startDate, endDate, classesRemaining: plan.maxClasses, createdBy });
    const payment = await this.#paymentRepository.create({ membershipSubscriptionId: subscription.id, amount: plan.price, method: paymentMethod, createdBy });
    const invoice = await this.#invoiceRepository.create({ paymentId: payment.id });
    return { subscription, payment, invoice };
  }
  renew = async ({ memberProfileId, membershipPlanId, paymentMethod, createdBy }) => {
    const plan = await this.#membershipPlanRepository.findById({ id: membershipPlanId });
    if (!plan || !plan.isActive) throw new NotFoundError('Membership plan not found or inactive');
    const current = await this.#subscriptionRepository.findActiveByMember({ memberProfileId });
    const startDate = current && current.endDate > new Date() ? current.endDate : new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationDays);
    const newSub = await this.#subscriptionRepository.create({ memberProfileId, membershipPlanId, startDate, endDate, classesRemaining: plan.maxClasses, createdBy, renewedFrom: current?.id });
    if (current) await this.#subscriptionRepository.updateStatus({ id: current.id, status: 'CANCELLED' });
    const payment = await this.#paymentRepository.create({ membershipSubscriptionId: newSub.id, amount: plan.price, method: paymentMethod, createdBy });
    const invoice = await this.#invoiceRepository.create({ paymentId: payment.id });
    return { subscription: newSub, payment, invoice };
  }
  getActiveSubscription = async ({ memberProfileId }) => this.#subscriptionRepository.findActiveByMember({ memberProfileId });
  getHistory = async ({ memberProfileId }) => this.#subscriptionRepository.getByMember({ memberProfileId });
  checkStatus = async ({ memberProfileId }) => {
    const sub = await this.#subscriptionRepository.findActiveByMember({ memberProfileId });
    if (!sub) return { hasActive: false, subscription: null };
    const daysLeft = Math.ceil((new Date(sub.endDate).getTime() - Date.now()) / 86400000);
    return { hasActive: true, subscription: sub, daysLeft };
  }
}
export default SubscriptionService;
