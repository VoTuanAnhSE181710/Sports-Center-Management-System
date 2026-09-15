import { StatusCodes } from 'http-status-codes';
class InvoiceController {
  #invoiceService; constructor({ invoiceService }) { this.#invoiceService = invoiceService; }
  getAll = async (req, res) => { const { page=1, limit=10 } = req.query; const r = await this.#invoiceService.getAll({ page:+page, limit:+limit }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#invoiceService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default InvoiceController;
