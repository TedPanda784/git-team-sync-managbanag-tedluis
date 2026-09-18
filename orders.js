function createOrder(items) {
  return {
    items,
    total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
    status: 'pending',
  };
}

function applyDiscount(order, percent) {
  const discounted = order.total * (1 - percent / 100);
  return { ...order, total: discounted };
}

function cancelOrder(order) {
  return { ...order, status: 'cancelled', total: 0 };
}

function calculateLoyaltyPoints(order) {
  const basePoints = Math.floor(order.total / 10);
  return order.total > 100 ? Math.floor(basePoints * 1.5) : basePoints;
}

module.exports = { createOrder, applyDiscount, cancelOrder, calculateLoyaltyPoints };
