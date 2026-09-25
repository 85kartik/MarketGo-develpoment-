import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const METHODS = [
  { key: "COD", label: "Cash on Delivery", icon: "cash-outline" },
  { key: "Online", label: "Pay Online", icon: "card-outline" },
];

export default function PaymentMethod({ value, onChange }) {
  return (
    <View style={styles.container}>
      {METHODS.map((m) => (
        <TouchableOpacity
          key={m.key}
          style={[styles.option, value === m.key && styles.optionSelected]}
          onPress={() => onChange(m.key)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={m.icon}
            size={22}
            color={value === m.key ? colors.primary : colors.textLight}
          />
          <Text
            style={[
              styles.label,
              value === m.key && styles.labelSelected,
            ]}
          >
            {m.label}
          </Text>

          <View style={styles.radioOuter}>
            {value === m.key && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: "#EFF6FF",
  },
  label: {
    flex: 1,
    marginLeft: 14,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  labelSelected: {
    color: colors.primary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
