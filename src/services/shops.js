import { InventoryCollection } from '../db/models/inventory.js';
import { ShopsCollection } from '../db/models/shop.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { UsersCollection } from '../db/models/user.js';
import mongoose from 'mongoose';

export const getShops = async () => {
  const shops = await ShopsCollection.find().lean();
  return shops;
};

export const getShopInventory = async ({
  shopId,
  page = 1,
  perPage = 9,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  userId = null,
}) => {
  const skip = (page - 1) * perPage;

  let favourites = [];
  if (userId) {
    const user = await UsersCollection.findById(userId).lean();
    favourites =
      user?.favourites?.map((f) => new mongoose.Types.ObjectId(f.flowerId)) ||
      [];
  }

  const pipeline = [
    { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
    {
      $addFields: {
        isFavorite: { $in: ['$flowerId', favourites] },
      },
    },
    {
      $lookup: {
        from: 'flowers',
        localField: 'flowerId',
        foreignField: '_id',
        as: 'flower',
      },
    },
    { $unwind: '$flower' },
    {
      $sort: {
        isFavorite: -1, // favourites first
        [`flower.${sortBy}`]: sortOrder,
      },
    },
    { $skip: skip },
    { $limit: perPage },
  ];

  const [flowers, flowersCount] = await Promise.all([
    InventoryCollection.aggregate(pipeline),
    InventoryCollection.countDocuments({ shopId }),
  ]);

  const paginationData = calculatePaginationData(flowersCount, perPage, page);

  return { data: flowers, ...paginationData };
};
