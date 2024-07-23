import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "@/contexts/AuthProvider";
import { useData } from "@/contexts/DataProvider";
import { useState } from "react";
import { router } from "expo-router";

export default function HomeScreen() {
  const { onLogout } = useAuth();
  const { products, categories } = useData();
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <Text>Home</Text>
        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <Text>LogOut</Text>
        </Pressable>
        <View>
          <ScrollView horizontal={true}>
            <View style={styles.categories}>
              {categories.map((category) => {
                return (
                  <Text
                    key={category.id}
                    style={{
                      ...styles.categoryName,
                      color:
                        category.id == selectedCategory ? "#CE9760" : "white",
                    }}
                  >
                    {category.name}
                  </Text>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.products}>
            {products.slice(0, 4).map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Pressable onPress={() => router.push(`product/${product.id}`)}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: product.image,
                    }}
                  />
                  <Text>{product.name}</Text>
                  <Text>{product.price}</Text>
                  <Text>{product.description}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#543A20",
  },
  page: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  logoutButton: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "orange",
  },
  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  productCard: {
    padding: 20,
    backgroundColor: "lightgray",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    width: 150,
    height: 200,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "semibold",
  },
});
