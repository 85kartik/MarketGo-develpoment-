import React from "react";
import { View, Text, ScrollView, StyleSheet, Share, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import { formatPrice, formatDate } from "../../utils/helpers";

export default function InvoiceScreen({ route }) {
  const { order } = route.params;

  const shareInvoice = async () => {
    const lines = order.products
      .map(
        (line) =>
          `${line.product?.name} x${line.quantity} - ${formatPrice(
            (line.product?.price || 0) * line.quantity
          )}`
      )
      .join("\n");

    await Share.share({
      message: `MarketGo Invoice\nOrder #${order._id.slice(-8).toUpperCase()}\nDate: ${formatDate(
        order.createdAt
      )}\n\n${lines}\n\nTotal: ${formatPrice(order.totalAmount)}\nPayment: ${order.paymentMethod} (${order.paymentStatus})`,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.brand}>MarketGo</Text>
        <Text style={styles.invoiceLabel}>INVOICE</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            Order #{order._id.slice(-8).toUpperCase()}
          </Text>
          <Text style={styles.metaText}>{formatDate(order.createdAt)}</Text>
        </View>

        <View style={styles.divider} />

        {order.products?.map((line, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
              {line.product?.name} x{line.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              {formatPrice((line.product?.price || 0) * line.quantity)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.itemRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(order.totalAmount)}</Text>
        </View>

        <Text style={styles.metaText}>
          Payment: {order.paymentMethod} • {order.paymentStatus}
        </Text>
      </View>

      <TouchableOpacity style={styles.shareBtn} onPress={shareInvoice}>
        <Ionicons name="share-outline" size={18} color="#fff" />
        <Text style={styles.shareText}>Share Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
  },
  invoiceLabel: {
    fontSize: 12,
    color: colors.textLight,
    letterSpacing: 2,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  metaText: {
    fontSize: 12,
    color: colors.textLight,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: colors.border,
    marginVertical: 14,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  itemName: {
    flex: 1,
    color: colors.text,
    marginRight: 10,
  },
  itemPrice: {
    color: colors.text,
    fontWeight: "600",
  },
  totalLabel: {
    fontWeight: "800",
    fontSize: 16,
    color: colors.text,
  },
  totalValue: {
    fontWeight: "800",
    fontSize: 16,
    color: colors.text,
  },
  shareBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  shareText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
});
