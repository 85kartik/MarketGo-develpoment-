import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const SecondaryButton = ({ title, onPress, disabled = false, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
});
