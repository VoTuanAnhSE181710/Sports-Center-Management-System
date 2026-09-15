import { StatusCodes } from 'http-status-codes';
class PaymentController {
  #paymentService; constructor({ paymentService }) { this.#paymentService = paymentService; }
  getAll = async (req, res) => { const { page=1, limit=10, status, method } = req.query; const r = await this.#paymentService.getAll({ page:+page, limit:+limit, status, method }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#paymentService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getRevenueReport = async (req, res) => { const r = await this.#paymentService.getRevenueReport(req.query); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default PaymentController;
