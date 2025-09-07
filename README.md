# flower-delivery-app

Backend To-Do
Base

- Set up backend with Node.js/Express (or another framework). +
- Connect to a real database (PostgreSQL, MongoDB, MySQL, etc.).+
- Implement API endpoints: +
- GET /shops - return shops and flowers. +
- POST /orders - create a new order (validate data). +
- Store order in DB with fields: products, quantities, email, phone, address. +

  Middle

- Extend /shops endpoint with sorting options (price/date). +
- Support favorites flag for products. +
- Add createdAt (datetime) to orders with timezone support. +
  // default timestamp created in utc, use toLocaleString()
- Add GET /orders/:id - return order details. +

  Advanced

- Add pagination support for GET /shops. +
- Add API integration for Google Maps (geocoding + shop location).
- (extra) Calculate route + ETA from shop to customer.
- (extra) Captcha validation for order creation.

Optional / Bonus

- GET /orders/history - query by email/phone/order id. +
- Add coupons table in DB and GET /coupons. +
- Support discount application in cart/order creation. +
