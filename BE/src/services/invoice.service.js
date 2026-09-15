import { NotFoundError } from '../error/error.js';
class InvoiceService {
  #invoiceRepository;
  constructor({ invoiceRepository }) { this.#invoiceRepository = invoiceRepository; }
  getAll = async (params) => this.#invoiceRepository.getAll(params);
  getById = async ({ id }) => { const inv = await this.#invoiceRepository.findById({ id }); if (!inv) throw new NotFoundError('Invoice not found'); return inv; }
  getByPayment = async ({ paymentId }) => this.#invoiceRepository.findByPayment({ paymentId });
}
export default InvoiceService;
