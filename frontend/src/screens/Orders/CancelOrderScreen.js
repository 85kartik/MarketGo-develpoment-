import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import orderService from "../../services/orderService";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import colors from "../../constants/colors";

export default function CancelOrderScreen({ route, navigation }) {
  const { order, onCancelled } = route.params;
  const [loading, setLoading] = useState(false);

  const confirmCancel = async () => {
    try {
      setLoading(true);
      const res = await orderService.cancelOrder(order._id);
      const updated = res.data.order;

      if (onCancelled) onCancelled(updated);
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        "Couldn't cancel",
        err.response?.data?.message || "Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={70} color={colors.danger} />

      <Text style={styles.title}>Cancel this order?</Text>
      <Text style={styles.subtitle}>
        Order #{order._id.slice(-8).toUpperCase()} will be cancelled. This
        can't be undone.
      </Text>

      <PrimaryButton
        title="Yes, Cancel Order"
        onPress={confirmCancel}
        loading={loading}
        style={{ width: "100%", marginTop: 30, backgroundColor: colors.danger }}
      />

      <SecondaryButton
        title="Keep Order"
        onPress={() => navigation.goBack()}
        style={{ width: "100%", marginTop: 14 }}
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
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginTop: 18,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: "center",
  },
});
