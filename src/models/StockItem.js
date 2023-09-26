export default class StockItem {
  constructor({ name, description, quantity, price, category }) {
    this.id = Math.floor(Math.random() * 1000000);
    this.name = name;
    this.description = description;
    this.quantity = +quantity;
    this.price = +price;
    this.category = category;
    this.createdAt = new Date();
    this.updateAt = new Date();
  }
}
