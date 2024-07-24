import { useData } from "@/contexts/DataProvider";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ProductScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products } = useData();
  console.log(id);
  return (
    <View>
      <Text>Product Screen</Text>
      <Text>Product ID: {id}</Text>
      {/* Add your product details and components here */}
    </View>
  );
};
const styles = StyleSheet.create({});

export default ProductScreen;
