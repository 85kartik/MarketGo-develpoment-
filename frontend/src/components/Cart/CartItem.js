import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import cartService from "../../services/cartService";
import { getImageUrl, formatPrice } from "../../utils/helpers";

export default function CartItem({
  item,
  reload,
}) {
  const increase = async () => {
    await cartService.updateQuantity(
      item._id,
      {
        quantity: item.quantity + 1,
      }
    );

    reload();
  };

  const decrease = async () => {
    if (item.quantity === 1) return;

    await cartService.updateQuantity(
      item._id,
      {
        quantity: item.quantity - 1,
      }
    );

    reload();
  };

  const remove = async () => {
    await cartService.removeItem(
      item._id
    );

    reload();
  };

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: getImageUrl(item.product?.photo),
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.product?.name}
        </Text>

        <Text style={styles.price}>
          {formatPrice(item.product?.price)}
        </Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={decrease}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={increase}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={remove}
        >
          <Text style={styles.remove}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
  },

  price: {
    marginTop: 8,
    fontSize: 18,
    color: "#22C55E",
    fontWeight: "700",
  },

  quantityRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },

  qtyButton: {
    width: 30,
    height: 30,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  qtyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  qty: {
    marginHorizontal: 15,
    fontWeight: "700",
  },

  remove: {
    marginTop: 12,
    color: "#EF4444",
    fontWeight: "600",
  },
});