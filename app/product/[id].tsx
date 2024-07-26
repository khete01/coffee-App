import { useData } from "@/contexts/DataProvider";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const ProductScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products } = useData();

  useEffect(() => {
    console.log("Product ID:", id);
    console.log("Products:", products);
  }, [id, products]);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {product.name || "Product not available"}
      </Text>

      <View style={styles.sizeContainer}>
        <TouchableOpacity style={styles.miniButton}>
          {/* <Text style={styles.sizeText}>Small</Text> */}
          <Image source={require("../../assets/images/mini.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediumButton}>
          <Image source={require("../../assets/images/medium.png")} />
          {/* <Text style={styles.sizeText}>Medium</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeButton}>
          <Image source={require("../../assets/images/large.png")} />
          {/* <Text style={styles.sizeText}>Large</Text> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#543A20",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  miniButton: {
    backgroundColor: "#CE9760",
    padding: 10,
    borderRadius: 10,
    width:60,
    height:60,
   
  },
  mediumButton: {
    backgroundColor: "#CE9760",
    padding: 10,
    borderRadius: 5,
    width:95,
    height:95
  },
  largeButton: {
    backgroundColor: "#CE9760",
    padding: 10,
    borderRadius: 5,
    width:125,
    height:125
  },
  sizeText: {
    fontSize: 18,
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#8A613A",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductScreen;
