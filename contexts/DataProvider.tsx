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
      const response = await fetch(
        "https://coffee-back-zbsc-test.vercel.app/api/product"
      );
      const data = await response.json();
      setProducts(data.product);
      //setCategories(data.categories);
      console.log(data);
      // setProducts(dummyData.products);
      setCategories(dummyData.categories);
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
