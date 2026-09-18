const orders = require('./orders');

let failures = 0;
function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    console.error(`FAIL: ${label} — expected ${expected}, got ${actual}`);
    failures++;
  } else {
    console.log(`PASS: ${label}`);
  }
}

const order = orders.createOrder([{ price: 10, qty: 2 }, { price: 5, qty: 4 }]); // total = 40
assertEqual(order.total, 40, 'order total');
assertEqual(order.status, 'pending', 'initial status');

const discounted = orders.applyDiscount(order, 10);
assertEqual(discounted.total, 36, '10% discount');

const cancelled = orders.cancelOrder(order);
assertEqual(cancelled.status, 'cancelled', 'cancel status');
assertEqual(cancelled.total, 0, 'cancel zeroes total');

const loyaltyOrder = orders.createOrder([{ price: 20, qty: 3 }]); // total = 60
assertEqual(orders.calculateLoyaltyPoints(loyaltyOrder), 6, 'loyalty points for a $60 order');

const roundedOrder = orders.createOrder([{ price: 12, qty: 1 }]); // total = 12, 12/10 = 1.2 -> rounds to 1
assertEqual(orders.calculateLoyaltyPoints(roundedOrder), 1, 'loyalty points round instead of truncate');

const vipOrder = orders.createOrder([{ price: 60, qty: 2 }]); // total = 120, base 12 -> VIP 1.5x = 18
assertEqual(orders.calculateLoyaltyPoints(vipOrder), 18, 'VIP bonus applies over $100');

process.exitCode = failures > 0 ? 1 : 0;
