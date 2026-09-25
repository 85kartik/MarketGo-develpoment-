import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function QuantitySelector({
  quantity,
  setQuantity,
}) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          quantity > 1 &&
          setQuantity(quantity - 1)
        }
      >
        <Text style={styles.symbol}>−</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>
        {quantity}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          setQuantity(quantity + 1)
        }
      >
        <Text style={styles.symbol}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  button: {
    width: 45,
    height: 45,
    backgroundColor: "#22C55E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  symbol: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  quantity: {
    marginHorizontal: 20,
    fontSize: 22,
    fontWeight: "700",
  },
});