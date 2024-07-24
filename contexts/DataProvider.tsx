import React, { useEffect, useState } from "react";
import { BasketItem, Category, Product } from "@/utils/types";
import dummyData from "../utils/dummy.json";

type Props = {
  children: React.ReactNode;
};

type DataContextType = {
  products: Product[];
  categories: Category[];
  basketItems: BasketItem[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setBasketItems: React.Dispatch<React.SetStateAction<BasketItem[]>>;
};

const DataContext = React.createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

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

  return (
    <DataContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        basketItems,
        setBasketItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  return React.useContext(DataContext);
};
