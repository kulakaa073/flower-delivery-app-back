import createHttpError from 'http-errors';

import {
  parsePaginationParams,
  parseSortParams,
} from '../utils/parserHelpers.js';

import { getShopInventory, getShops } from '../services/shops.js';
import { createOrder, getOrderById, getOrders } from '../services/orders.js';
import { getCoupons } from '../services/coupons.js';
import { getUser } from '../services/users.js';
import { updateFavourites } from '../services/flowers.js';
import { UsersCollection } from '../db/models/user.js';

export const getShopsController = async (req, res, next) => {
  const shops = await getShops();
  res.status(200).json({
    message: 'Shops retrieved successfully',
    data: shops,
  });
};

export const getOrderByIdController = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await getOrderById(orderId);

  if (!order) {
    throw createHttpError(404, 'Order not found');
  }

  res.status(200).json({
    message: `Successfully found order with id: ${orderId}`,
    data: order,
  });
};

export const getOrdersController = async (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;

  const user = await getUser({ email, phone });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const orders = await getOrders(user._id);

  if (!orders || orders.length === 0) {
    throw createHttpError(404, 'No orders found of the user');
  }

  res.status(200).json({
    message: `Successfully found orders of user with id: ${user._id}`,
    data: orders,
  });
};

export const getCouponsController = async (req, res, next) => {
  const coupons = await getCoupons();
  if (!coupons || coupons.length === 0) {
    throw createHttpError(404, 'No coupons found');
  }

  res.status(200).json({
    message: `Successfully found coupons`,
    data: coupons,
  });
};

export const getUserController = async (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const user = await getUser(email, phone);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    message: `Successfully found user`,
    data: user,
  });
};

export const createOrderController = async (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;

  let user = await getUser(email, phone);

  if (!user) {
    user = await UsersCollection.create({
      email: email,
      phone: phone,
      lastDeliveryAddress: req.body.deliveryAddress,
    });
  } else {
    user.lastDeliveryAddress = req.body.deliveryAddress;
    await user.save();
  }

  const order = await createOrder({ ...req.body, userId: user._id });

  res.status(201).json({
    message: 'Successfully placed an order',
    data: order,
  });
};

export const getShopInventoryController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { shopId } = req.params;

  const email = req.body.email;
  const phone = req.body.phone;

  let userId = null;
  if (email && phone) {
    const user = await UsersCollection.findOne({ email, phone });
    if (user) {
      userId = user._id;
    }
  }

  const inventory = await getShopInventory({
    page,
    perPage,
    sortBy,
    sortOrder,
    shopId,
    userId,
  });

  res.status(200).json({
    message: `Successfully found shop ${shopId} invenory`,
    data: inventory,
  });
};

export const updateFavouritesController = async (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const user = await getUser(email, phone);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const updatedFavourites = await updateFavourites(
    user._id,
    req.body.favourites,
  );

  res.status(201).json({
    message: 'Successfully updated user favourites',
    data: updatedFavourites,
  });
};
