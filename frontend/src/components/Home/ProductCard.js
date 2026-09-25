import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../../constants/colors";
import { getImageUrl, formatPrice } from "../../utils/helpers";
import cartService from "../../services/cartService";

export default function ProductCard({ item }) {
  const navigation = useNavigation();
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const cardScale = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const openDetails = () => {
    Animated.sequence([
      Animated.spring(cardScale, { toValue: 0.97, useNativeDriver: true, speed: 40 }),
      Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, speed: 20 }),
    ]).start();

    navigation.navigate("ProductDetails", { productId: item._id });
  };

  const bounceButton = () => {
    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.85, useNativeDriver: true, speed: 50 }),
      Animated.spring(buttonScale, { toValue: 1.08, useNativeDriver: true, speed: 20 }),
      Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, speed: 20 }),
    ]).start();
  };

  const addToCart = async (e) => {
    e.stopPropagation();

    try {
      setAdding(true);
      await cartService.addToCart({ product: item._id, quantity: 1 });

      bounceButton();
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    } catch (err) {
      Alert.alert("Couldn't add to cart", "Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: cardScale }] }}>
      <TouchableOpacity style={styles.card} onPress={openDetails} activeOpacity={0.9}>
        <Image source={{ uri: getImageUrl(item.photo) }} style={styles.image} />

        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, justAdded && styles.buttonAdded]}
            onPress={addToCart}
            disabled={adding}
            activeOpacity={0.85}
          >
            {adding ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : justAdded ? (
              <View style={styles.buttonContent}>
                <Ionicons name="checkmark" size={16} color="#fff" />
                <Text style={styles.buttonText}>Added</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Add</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { width: 170, backgroundColor: "#fff", padding: 12, borderRadius: 16, marginRight: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  image: { width: "100%", height: 110, resizeMode: "contain" },
  name: { marginTop: 10, fontSize: 15, fontWeight: "600", color: colors.text },
  price: { marginTop: 5, fontWeight: "700", fontSize: 18, color: colors.primary },
  button: { marginTop: 10, backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", minHeight: 38 },
  buttonAdded: { backgroundColor: colors.success },
  buttonContent: { flexDirection: "row", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", marginLeft: 4 },
});