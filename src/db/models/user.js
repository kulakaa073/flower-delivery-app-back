import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    lastDeliveryAddress: { type: String },
    favourites: {
      type: [
        {
          flowerId: {
            type: Schema.Types.ObjectId,
            ref: 'flowers',
          },
        },
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', userSchema);
