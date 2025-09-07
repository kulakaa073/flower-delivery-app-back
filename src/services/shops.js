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
  sortBy = 'createdAt',
  sortOrder = SORT_ORDER.ASC,
  userId = null,
}) => {
  const skip = (page - 1) * perPage;

  let favourites = [];
  if (userId) {
    const user = await UsersCollection.findById(userId).lean();
    favourites = user?.favourites?.map((f) => f.flowerId) || [];
  }

  const pipeline = [
    { $match: { shopId: mongoose.Types.ObjectId.createFromHexString(shopId) } },
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
      $addFields: {
        sortField: `$flower.${sortBy}`,
      },
    },
    {
      $sort: {
        isFavorite: -1,
        sortField: sortOrder,
      },
    },
    { $skip: skip },
    { $limit: perPage },
    {
      $project: {
        _id: '$flower._id',
        name: '$flower.name',
        price: '$flower.price',
        imageUrl: '$flower.imageUrl',
        isBouquet: '$flower.isBouquet',
        createdAt: '$flower.createdAt',
        updatedAt: '$flower.updatedAt',
        stock: 1, // from inventory
        isFavorite: 1, // our computed field
      },
    },
  ];

  const [flowers, flowersCount] = await Promise.all([
    InventoryCollection.aggregate(pipeline),
    InventoryCollection.countDocuments({ shopId }),
  ]);

  const paginationData = calculatePaginationData(flowersCount, perPage, page);

  return { data: flowers, ...paginationData };
};
