import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SecondaryButton from "../../components/Buttons/SecondaryButton";
import colors from "../../constants/colors";

// NOTE: the backend doesn't have a returns workflow yet (no return
// status/reason fields on the Order model, no return endpoint). This
// screen is intentionally informational rather than pretending to submit
// a request that goes nowhere. Add an Order.returnStatus field + a
// POST /order/return/:id endpoint when you're ready to make this real.
export default function ReturnOrderScreen({ route, navigation }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Ionicons name="construct-outline" size={70} color={colors.textLight} />

      <Text style={styles.title}>Returns aren't available yet</Text>
      <Text style={styles.subtitle}>
        Order #{order._id.slice(-8).toUpperCase()} was delivered, but this
        app doesn't support return requests yet. For now, please contact
        support directly to arrange a return.
      </Text>

      <SecondaryButton
        title="Back to Order"
        onPress={() => navigation.goBack()}
        style={{ width: "100%", marginTop: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginTop: 18,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 20,
  },
});
