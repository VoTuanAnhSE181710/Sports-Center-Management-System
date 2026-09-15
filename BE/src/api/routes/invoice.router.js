import { Router } from 'express';
import { makeInvoker } from 'awilix-express';
import InvoiceController from '../controllers/invoice.controller.js';
import { authenticate, authorize } from '../middlewares/middleware.js';
const api = makeInvoker(InvoiceController);
const router = Router();
router.get('/', authenticate, authorize(['Manager', 'Receptionist']), api('getAll'));
router.get('/:id', authenticate, api('getById'));
export default router;
