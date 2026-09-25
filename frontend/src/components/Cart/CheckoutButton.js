import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function CheckoutButton({
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Proceed To Checkout
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    backgroundColor: "#22C55E",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});