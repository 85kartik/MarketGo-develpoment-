import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function AddToCartBar({ onCart, onBuy, cartLoading = false, buyLoading = false }) {
  const [justAdded, setJustAdded] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const bounce = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 50 }),
      Animated.spring(scale, { toValue: 1.05, useNativeDriver: true, speed: 20 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }),
    ]).start();
  };

  const handleAddToCart = async () => {
    const success = await onCart();
    if (!success) return;

    bounce();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[{ flex: 1, transform: [{ scale }] }]}>
        <TouchableOpacity
          style={[styles.cart, justAdded && styles.cartAdded]}
          onPress={handleAddToCart}
          disabled={cartLoading || buyLoading}
        >
          {cartLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : justAdded ? (
            <View style={styles.contentRow}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.text}>Added to Cart</Text>
            </View>
          ) : (
            <Text style={styles.text}>Add to Cart</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.buy} onPress={onBuy} disabled={cartLoading || buyLoading}>
        {buyLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.text}>Buy Now</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 15, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 8 },
  cart: { backgroundColor: "#2563EB", padding: 16, borderRadius: 12, marginRight: 10, alignItems: "center", justifyContent: "center", minHeight: 52 },
  cartAdded: { backgroundColor: colors.success },
  buy: { flex: 1, backgroundColor: "#22C55E", padding: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", minHeight: 52 },
  contentRow: { flexDirection: "row", alignItems: "center" },
  text: { color: "#fff", fontWeight: "700", fontSize: 16, marginLeft: 6 },
});