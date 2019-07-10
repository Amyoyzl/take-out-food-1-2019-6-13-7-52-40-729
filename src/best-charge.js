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

const getItemsInfo = (items, allItems) => {
  for (let i = 0; i < items.length; i++) {
    allItems.forEach(eItem => {
      if (items[i].id == eItem.id) {
        items[i].name = eItem.name;
        items[i].price = eItem.price;
      }
    })
  }
  return items;
}

const bestCharge = selectedItems => {
  // TODO 
}

module.exports = {
  bestCharge, getItems, getItemsInfo,
}