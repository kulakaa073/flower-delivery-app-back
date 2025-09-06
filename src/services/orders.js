import { CouponsCollection } from '../db/models/coupon';
import { OrdersCollection } from '../db/models/order';
import createHttpError from 'http-errors';

export const getOrderById = async (orderId) => {
  const order = await OrdersCollection.findById(orderId).lean();
  return order;
};

export const getOrders = async ({ userId }) => {
  const orders = await OrdersCollection.find({ userId: userId }).lean();
  return orders;
};

export const createOrder = async (params) => {
  const { phone, email, ...orderData } = params;
  const coupon = await CouponsCollection.findById(orderData.couponId);

  if (!coupon) {
    throw createHttpError(400, 'Coupon does not exist');
  }

  if (coupon.validUntil && coupon.validUntil > Date.now()) {
    throw createHttpError(400, 'Coupon is expired');
  }

  const checkTotal = (items, total, coupon = null) => {
    let sum = items.reduce(
      (acc, item) => acc + item.count * item.priceAtPurchase,
      0,
    );
    switch (coupon.discountType) {
      case 'percent':
        sum = sum * (1 - coupon.discountValue / 100);
        break;
      case 'fixed':
        sum = sum - coupon.discountValue;
        break;
      default:
        throw createHttpError(
          500,
          'Something went wrong when applying coupon discount',
        );
    }

    if (total != sum) {
      return false;
    }
    return true;
  };

  if (!checkTotal(params.items, params.total, coupon)) {
    throw createHttpError(400, 'Total is wrong');
  }

  const order = await OrdersCollection.create(orderData);
  return order;
};
