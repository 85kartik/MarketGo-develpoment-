import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../Buttons/PrimaryButton";
import colors from "../../constants/colors";

export default function ErrorView({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={64} color={colors.danger} />
      <Text style={styles.text}>{message}</Text>

      {onRetry && (
        <PrimaryButton title="Try Again" onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  text: {
    fontSize: 15,
    color: colors.text,
    marginTop: 16,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    width: "70%",
  },
});
