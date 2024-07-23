export type Product = {
  name: string;
  price: number;
  image: string;
  description: string;
  id: number;
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
