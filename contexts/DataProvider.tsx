import React, { useEffect, useState } from "react";
import { BasketItem, Category, Product, Discounts } from "@/utils/types";
import dummyData from "../utils/dummy.json";

type Props = {
  children: React.ReactNode;
};

type DataContextType = {
  products: Product[];
  categories: Category[];
  basketItems: BasketItem[];
  discounts: Discounts[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setBasketItems: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  setDiscounts: React.Dispatch<React.SetStateAction<Discounts[]>>;
};

const DataContext = React.createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [discounts, setDiscounts] = useState<Discounts[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://coffee-back-a6hj.vercel.app/api/product"
        );
        const data = await response.json();
        setProducts(data);
        setCategories(dummyData.categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(
          "https://coffee-back-a6hj.vercel.app/api/promotion"
        );
        const data = await response.json();
        setDiscounts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchDiscounts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        basketItems,
        setBasketItems,
        setDiscounts,
        discounts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  return React.useContext(DataContext);
};
