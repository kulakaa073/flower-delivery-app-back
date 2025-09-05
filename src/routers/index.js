import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/shops', ctrlWrapper(getShopsController));
router.get('/order/:orderId', ctrlWrapper(getOrderByIdController));
router.get('/order', ctrlWrapper(getOrdersController)); // will have email or phone in the request to return only specific user's orders
router.get('/coupons', ctrlWrapper(getCouponsController));
router.get('/user', ctrlWrapper(getUserController));
router.post(
  '/order',
  validateBody(createOrderSchema),
  ctrlWrapper(createOrderController),
);

export default router;
