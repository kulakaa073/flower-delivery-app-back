import { UsersCollection } from '../db/models/user.js';

export const getUser = async (email, phone) => {
  let query = null;

  if (email && phone) {
    query = { email, phone };
  } else if (email) {
    query = { email };
  } else if (phone) {
    query = { phone };
  }

  if (!query) return null;

  return await UsersCollection.findOne(query);
};
