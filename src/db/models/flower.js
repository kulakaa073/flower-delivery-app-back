import { model, Schema } from 'mongoose';

const flowerSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    // dateAdded - timestamps
    // shopId - removed, cuz many shops can have this one flower or bouqeut
    isBouquet: { type: Boolean },
  },
  { timestamps: true, versionKey: false },
);

export const FlowersCollection = model('flowers', flowerSchema);
