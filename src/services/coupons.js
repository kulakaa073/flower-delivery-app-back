import { CouponsCollection } from '../db/models/coupon.js';

export const getCoupons = async () => {
  const coupons = await CouponsCollection.find().lean();
  return coupons;
};
