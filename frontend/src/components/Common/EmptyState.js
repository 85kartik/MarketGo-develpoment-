import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

export default function EmptyState({
  icon = "alert-circle-outline",
  title = "Nothing here yet",
  subtitle,
  children,
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={70} color={colors.textLight} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 6,
    textAlign: "center",
  },
});
