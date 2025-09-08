import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    items: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            ref: 'flowers',
            required: true,
          },
          count: { type: Number, required: true },
          priceAtPurchase: { type: Number, required: true },
        },
      ],
    },
    total: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    // createdAt - timestamps
    shopId: { type: Schema.Types.ObjectId, ref: 'shops', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    couponId: { type: Schema.Types.ObjectId, ref: 'coupons' },
  },
  { timestamps: true, versionKey: false },
);

export const OrdersCollection = model('orders', orderSchema);
