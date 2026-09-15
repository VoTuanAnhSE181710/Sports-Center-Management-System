import { NotFoundError } from '../error/error.js';
class PaymentService {
  #paymentRepository; #invoiceRepository;
  constructor({ paymentRepository, invoiceRepository }) { this.#paymentRepository = paymentRepository; this.#invoiceRepository = invoiceRepository; }
  getAll = async (params) => this.#paymentRepository.getAll(params);
  getById = async ({ id }) => { const p = await this.#paymentRepository.findById({ id }); if (!p) throw new NotFoundError('Payment not found'); return p; }
  getRevenueReport = async ({ startDate, endDate }) => this.#paymentRepository.getRevenueReport({ startDate: new Date(startDate), endDate: new Date(endDate) });
}
export default PaymentService;
