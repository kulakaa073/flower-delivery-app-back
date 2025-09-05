import { model, Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    flowers: {
      type: [
        {
          flowerId: {
            type: Schema.Types.ObjectId,
            ref: 'flowers',
            required: true,
          },
          stock: { type: Number, required: true },
        },
      ],
    },
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  },
  { timestamps: true, versionKey: false },
);

export const shopsCollection = model('shops', shopSchema);
