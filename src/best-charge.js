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
  const countItems = getItems(selectedItems);
  const allItems = dateItem.loadAllItems();
  const items = getItemsInfo(countItems, allItems);
  const promotions = dataPromotion.loadPromotions().slice();
  let receipt = "============= 订餐明细 =============\n";
  let total = 0;
  let bestSave = 0;
  items.forEach(item => {
    receipt += `${item.name} x ${item.count} = ${item.price * item.count}元\n`;
    total += item.price * item.count;
    promotions[1].items.forEach(e => {
      if (e == item.id) bestSave += item.price / 2;
    })
  })
  if (bestSave > 0) {
    receipt += "-----------------------------------\n使用优惠:\n";
    let saveString = "";
    if (total >= 30 && bestSave < 6) {
      bestSave = 6;
      saveString = `满30减6元，省6元\n`;
    }
    if (bestSave > 6) {
      saveString = `指定菜品半价(黄焖鸡，凉皮)，省${bestSave}元\n`;
    }
    receipt += saveString;
  }
  receipt += "-----------------------------------\n";
  receipt += `总计：${total - bestSave}元\n===================================`;
  return receipt;
}

module.exports = {
  bestCharge, getItems, getItemsInfo,
}