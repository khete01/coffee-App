export type Product = {
  title: string;
  name: string;
  price: number;
  image: string;
  description: string;
  id: string;
  categoryId: number;
};
export type BasketItem = {
  product: Product;
  quantity: number;
};
export type Category = {
  id: number;
  name: string;
};
export type Discounts = {
  producId: String;
  title: String;
  description: String;
};
