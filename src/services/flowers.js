import { UsersCollection } from '../db/models/user';

export const updateFavourites = async (userId, favourites) => {
  const updatedFavourites = await UsersCollection.findByIdAndUpdate(userId, {
    favourites: favourites,
  });

  return updatedFavourites;
};
