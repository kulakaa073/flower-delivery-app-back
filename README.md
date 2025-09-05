# flower-delivery-app

Flower {
\_id
name
price
imageUrl? // for frontend display
dateAdded // for sorting by date
shopId // reference to Shop
isBouquet // optional: to distinguish bouquet vs single flower
}

Order {
\_id
items: [{ flowerId, count, priceAtPurchase }]
total
deliveryAddress
createdAt
userId // reference to User
couponId?
shopId
}

Coupon {
\_id
code
discountType ("percent" | "fixed") // more flexible than just number
discountValue
validUntil? // optional for expiration
}

Shop {
\_id
name
address
flowers: [{ flowerId, stock }]
location: { lat, lng } // useful for maps integration
}

User {
\_id
email
phone
lastDeliveryAddress? // optional, updated on new order
}

sorting by price
sorting by date
