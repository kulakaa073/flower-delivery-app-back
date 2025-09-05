import { model, Schema } from 'mongoose';

const couponSchema = new Schema(
  {
    code: { type: String, required: true },
    discountType: { type: String, enum: ['percent', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    validUntil: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

export const CouponsCollection = model('coupons', couponSchema);
