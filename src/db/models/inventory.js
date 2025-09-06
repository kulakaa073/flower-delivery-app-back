import { model, Schema } from 'mongoose';

const inventorySchema = new Schema(
  {
    shopId: { type: Schema.Types.ObjectId, ref: 'shops', required: true },
    flowerId: { type: Schema.Types.ObjectId, ref: 'flowers', required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

inventorySchema.index({ shopId: 1 });

export const InventoryCollection = model('inventory', inventorySchema);
