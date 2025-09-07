import { faker } from '@faker-js/faker';

import { FlowersCollection } from './src/db/models/flower.js';
import { initMongoConnection } from './src/db/initMongoConnection.js';
import { ShopsCollection } from './src/db/models/shop.js';
import { InventoryCollection } from './src/db/models/inventory.js';
import { CouponsCollection } from './src/db/models/coupon.js';

async function seed() {
  await initMongoConnection();
  console.log('connection established');

  // Clear old data

  await FlowersCollection.deleteMany({});
  await ShopsCollection.deleteMany({});
  await InventoryCollection.deleteMany({});
  await CouponsCollection.deleteMany({});

  const flowerUrls = [
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234946/photo-1541275055241-329bbdf9a191_xi2da4.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234945/photo-1490750967868-88aa4486c946_vgbgxh.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234944/photo-1486944859394-ed1c44255713_g5ef6z.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234944/photo-1460039230329-eb070fc6c77c_zand4k.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234943/photo-1508808703020-ef18109db02f_s57qom.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234942/photo-1613539246066-78db6ec4ff0f_fncw30.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234941/photo-1468327768560-75b778cbb551_tyqcuh.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234940/photo-1515865404355-ddb5b0910878_esjbf7.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234940/photo-1519378058457-4c29a0a2efac_qv3kf6.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234937/photo-1582794543139-8ac9cb0f7b11_c3wzdb.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234936/photo-1469259943454-aa100abba749_sjwvvw.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234936/photo-1454262041357-5d96f50a2f27_arrrmx.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234936/photo-1457089328109-e5d9bd499191_rg2fvk.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234936/photo-1471696035578-3d8c78d99684_g09bsx.jpg',
    'https://res.cloudinary.com/drbps4c6a/image/upload/v1757234935/photo-1615280825886-fa817c0a06cc_xel5xn.jpg',
  ];

  const flowerNames = [
    'Rose',
    'Cherry',
    'Dark Violet',
    'Iris',
    'Dahlia',
    'Lily',
    'Magonlia',
    'Daisy',
    'Poppy',
    'Ivy',
    'Jasmine',
    'Orchid',
    'Peony',
    'Sunflower',
  ];

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Create flowers
  const flowers = [];
  for (let i = 0; i < 20; i++) {
    flowers.push({
      name: getRandomItem(flowerNames),
      imageUrl: getRandomItem(flowerUrls),
      price: faker.commerce.price({ min: 2, max: 50, dec: 0 }),
      isBouquet:
        faker.helpers.arrayElement(['single', 'bouquet']) === 'bouquet'
          ? true
          : null,
    });
  }
  const savedFlowers = await FlowersCollection.insertMany(flowers);

  // Create shops
  const shops = [];
  for (let i = 0; i < 5; i++) {
    shops.push({
      name: faker.company.name(),
      address: faker.location.city(),
      location: { lat: faker.number.int(), lng: faker.number.int() },
    });
  }
  const savedShops = await ShopsCollection.insertMany(shops);

  // Create inventory linking shops + flowers
  const inventory = [];
  savedShops.forEach((shop) => {
    const sampleFlowers = faker.helpers.arrayElements(savedFlowers, 10);
    sampleFlowers.forEach((flower) => {
      inventory.push({
        shopId: shop._id,
        flowerId: flower._id,
        stock: faker.number.int({ min: 5, max: 100 }),
      });
    });
  });
  await InventoryCollection.insertMany(inventory);

  // Create coupons
  const coupons = [
    {
      code: 'WELCOME10',
      discountType: 'percent',
      discountValue: 10,
      validUntil: faker.date.future(),
    },
    {
      code: 'FREESHIP',
      discountType: 'fixed',
      discountValue: 5,
      validUntil: faker.date.future(),
    },
  ];
  await CouponsCollection.insertMany(coupons);

  console.log('✅ Database seeded with mock data!');
}

seed().catch((err) => console.error(err));
