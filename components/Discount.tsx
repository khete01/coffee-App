import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useData } from "@/contexts/DataProvider";

const Discount = () => {
  const { discounts } = useData();

  return (
    <View style={styles.container}>
      <View>
        {discounts.map((discount, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.title}>{discount.title}</Text>
            <Text style={styles.description}>{discount.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CE97607D",
    height: 150,
    width: 350,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: "white",
    //fontFamily: "Poppins",
    fontSize: 18,
    lineHeight: 27,
    textAlign: "left",
  },
  description: {
    //fontFamily: "Poppins"
    fontSize: 10,
    lineHeight: 11,
    textAlign: "left",
    color: "white",
  },
  box: {
    padding: 15,
  },
});

export default Discount;

export type Discounts = {
  productId: string;
  title: string;
  description: string;
};
