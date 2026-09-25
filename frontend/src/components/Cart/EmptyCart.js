import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../Buttons/PrimaryButton";
import colors from "../../constants/colors";

export default function EmptyCart({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={80} color={colors.textLight} />

      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>
        Looks like you haven't added anything yet.
      </Text>

      <PrimaryButton
        title="Start Shopping"
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: "center",
  },
  button: {
    marginTop: 28,
    width: "80%",
  },
});
