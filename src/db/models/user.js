import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
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

userSchema.index({ email: 1, phone: 1 }, { unique: true });

export const UsersCollection = model('users', userSchema);
