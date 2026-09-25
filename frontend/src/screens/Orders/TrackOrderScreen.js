import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import { formatDate } from "../../utils/helpers";

const STEPS = ["Pending", "Confirmed", "Shipped", "Delivered"];

const STEP_META = {
  Pending: { icon: "time-outline", label: "Order Placed" },
  Confirmed: { icon: "checkmark-circle-outline", label: "Confirmed" },
  Shipped: { icon: "airplane-outline", label: "Shipped" },
  Delivered: { icon: "home-outline", label: "Delivered" },
};

export default function TrackOrderScreen({ route }) {
  const { order } = route.params;

  const isCancelled = order.orderStatus === "Cancelled";
  const currentIndex = STEPS.indexOf(order.orderStatus);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Order #{order._id.slice(-8).toUpperCase()}</Text>
      <Text style={styles.subtitle}>Placed on {formatDate(order.createdAt)}</Text>

      {isCancelled ? (
        <View style={styles.cancelledBox}>
          <Ionicons name="close-circle" size={40} color={colors.danger} />
          <Text style={styles.cancelledText}>This order was cancelled.</Text>
        </View>
      ) : (
        <View style={styles.timeline}>
          {STEPS.map((step, index) => {
            const done = index <= currentIndex;
            const meta = STEP_META[step];

            return (
              <View key={step} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      done && styles.iconCircleDone,
                    ]}
                  >
                    <Ionicons
                      name={meta.icon}
                      size={18}
                      color={done ? "#fff" : colors.textLight}
                    />
                  </View>
                  {index < STEPS.length - 1 && (
                    <View
                      style={[
                        styles.connector,
                        index < currentIndex && styles.connectorDone,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepInfo}>
                  <Text
                    style={[
                      styles.stepLabel,
                      done && styles.stepLabelDone,
                    ]}
                  >
                    {meta.label}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 24,
  },
  timeline: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  stepRow: {
    flexDirection: "row",
  },
  stepLeft: {
    alignItems: "center",
    marginRight: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleDone: {
    backgroundColor: colors.success,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: colors.border,
  },
  connectorDone: {
    backgroundColor: colors.success,
  },
  stepInfo: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  stepLabel: {
    fontSize: 15,
    color: colors.textLight,
    fontWeight: "600",
  },
  stepLabelDone: {
    color: colors.text,
  },
  cancelledBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
  },
  cancelledText: {
    marginTop: 12,
    color: colors.text,
    fontWeight: "600",
  },
});
