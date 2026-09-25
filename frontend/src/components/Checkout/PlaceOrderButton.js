import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default function PlaceOrderButton({ onPress, loading, label = "Place Order", total }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>
          {label}
          {total !== undefined ? ` • ₹${total}` : ""}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    backgroundColor: colors.secondary,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
