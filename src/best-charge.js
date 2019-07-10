const dateItem = require('./items');
const dataPromotion = require('./promotions');
const getItems = selectedItems => {
  const items = [];
  selectedItems.forEach(item => {
    let token = item.indexOf('x');
    items.push({ 'id': item.substring(0, token).trim(), 'count': parseInt(item.substring(token + 1)) });
  })
  return items;
}

const bestCharge = selectedItems => {
  // TODO 
}

module.exports = {
  bestCharge, getItems,
}