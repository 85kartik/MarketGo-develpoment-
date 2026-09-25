import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default function ProductInfo({ product }) {
  const inStock = product.inStock !== false && product.quantity > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>

      {product.category?.name && <Text style={styles.category}>{product.category.name}</Text>}

      <Text style={styles.price}>₹ {product.price}</Text>

      <Text style={[styles.stock, inStock ? styles.inStock : styles.outOfStock]}>
        {inStock ? "In Stock" : "Out of Stock"}
      </Text>

      {product.description ? <Text style={styles.description}>{product.description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18 },
  name: { fontSize: 24, fontWeight: "700" },
  category: { marginTop: 5, color: "#666" },
  price: { marginTop: 15, fontSize: 28, color: colors.primary, fontWeight: "700" },
  stock: { marginTop: 8, fontSize: 13, fontWeight: "700" },
  inStock: { color: colors.success },
  outOfStock: { color: colors.danger },
  description: { marginTop: 20, color: "#555", lineHeight: 24 },
});