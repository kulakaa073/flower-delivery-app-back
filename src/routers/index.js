import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCouponsController,
  getOrderByIdController,
  getOrdersController,
  getUserController,
  getShopsController,
  createOrderController,
  updateFavouritesController,
  getShopInventoryController,
} from '../controllers/controller.js';
import { createOrderSchema } from '../validation/order.js';
import { updateFavouritesSchema } from '../validation/favourites.js';
import { userDataSchema } from '../validation/user.js';

const router = Router();

router.get('/shops', ctrlWrapper(getShopsController));
router.get('/orders/:orderId', ctrlWrapper(getOrderByIdController));
router.post(
  '/orders',
  validateBody(userDataSchema),
  ctrlWrapper(getOrdersController),
);
router.get('/coupons', ctrlWrapper(getCouponsController));
router.post(
  '/user',
  validateBody(userDataSchema),
  ctrlWrapper(getUserController),
);
router.post(
  '/orders',
  validateBody(createOrderSchema),
  ctrlWrapper(createOrderController),
);
router.post(
  '/shops/:shopId/flowers',
  validateBody(userDataSchema),
  ctrlWrapper(getShopInventoryController),
);
router.patch(
  '/favourites',
  validateBody(updateFavouritesSchema),
  ctrlWrapper(updateFavouritesController),
);

export default router;
