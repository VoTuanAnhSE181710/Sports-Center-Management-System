import { StatusCodes } from 'http-status-codes';
class SubscriptionController {
  #subscriptionService; #memberService;
  constructor({ subscriptionService, memberService }) { this.#subscriptionService = subscriptionService; this.#memberService = memberService; }
  register = async (req, res) => {
    const member = await this.#memberService.getMemberByUserId({ userId: req.user.userId }).catch(() => null);
    const memberProfileId = member ? member.id : req.body.memberProfileId;
    const r = await this.#subscriptionService.register({ memberProfileId, membershipPlanId: req.body.membershipPlanId, paymentMethod: req.body.paymentMethod, createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ status: 'success', data: r });
  }
  renew = async (req, res) => {
    const r = await this.#subscriptionService.renew({ memberProfileId: req.body.memberProfileId, membershipPlanId: req.body.membershipPlanId, paymentMethod: req.body.paymentMethod, createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', data: r });
  }
  checkStatus = async (req, res) => {
    const memberProfileId = req.params.memberProfileId;
    const r = await this.#subscriptionService.checkStatus({ memberProfileId });
    res.status(StatusCodes.OK).json({ status: 'success', data: r });
  }
  getHistory = async (req, res) => {
    const r = await this.#subscriptionService.getHistory({ memberProfileId: req.params.memberProfileId });
    res.status(StatusCodes.OK).json({ status: 'success', data: r });
  }
}
export default SubscriptionController;
