import { UsersCollection } from '../db/models/user.js';

export const updateFavourites = async (userId, favourites) => {
  const updatedFavourites = await UsersCollection.findByIdAndUpdate(
    userId,
    { favourites },
    { new: true },
  );

  return updatedFavourites;
};
