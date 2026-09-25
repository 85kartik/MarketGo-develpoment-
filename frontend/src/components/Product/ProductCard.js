import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

export default function ProductCard({ product }) {
  const navigation = useNavigation();

  const discount =
    product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product._id,
        })
      }
    >
      {/* Discount Badge */}

      {discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {discount}% OFF
          </Text>
        </View>
      )}

      {/* Wishlist */}

      <TouchableOpacity style={styles.favorite}>
        <Ionicons
          name="heart-outline"
          size={20}
          color="#555"
        />
      </TouchableOpacity>

      {/* Product Image */}

      <Image
        source={{
          uri:
            product.images?.[0] ||
            "https://via.placeholder.com/200",
        }}
        style={styles.image}
      />

      {/* Name */}

      <Text
        numberOfLines={2}
        style={styles.name}
      >
        {product.name}
      </Text>

      {/* Category */}

      <Text style={styles.category}>
        {product.category?.name || "Category"}
      </Text>

      {/* Rating */}

      <View style={styles.ratingRow}>
        <Ionicons
          name="star"
          size={14}
          color="#FFC107"
        />

        <Text style={styles.rating}>
          {product.rating || 4.5}
        </Text>

        <Text style={styles.review}>
          ({product.totalReviews || 0})
        </Text>
      </View>

      {/* Price */}

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          ₹{product.price}
        </Text>

        {product.oldPrice && (
          <Text style={styles.oldPrice}>
            ₹{product.oldPrice}
          </Text>
        )}
      </View>

      {/* Stock */}

      <Text
        style={[
          styles.stock,
          {
            color:
              product.stock > 0
                ? "#22C55E"
                : "#EF4444",
          },
        ]}
      >
        {product.stock > 0
          ? "In Stock"
          : "Out of Stock"}
      </Text>

      {/* Add Button */}

      <TouchableOpacity
        style={styles.button}
      >
        <Ionicons
          name="cart-outline"
          size={18}
          color="#fff"
        />

        <Text style={styles.buttonText}>
          Add
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginRight: 15,
    marginBottom: 15,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },

  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },

  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 5,
  },

  discountText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  name: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    minHeight: 42,
  },

  category: {
    color: "#777",
    marginTop: 4,
    fontSize: 13,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  rating: {
    marginLeft: 4,
    fontWeight: "600",
  },

  review: {
    marginLeft: 5,
    color: "#777",
    fontSize: 12,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.primary,
  },

  oldPrice: {
    marginLeft: 8,
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 14,
  },

  stock: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 13,
  },

  button: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "700",
  },
});