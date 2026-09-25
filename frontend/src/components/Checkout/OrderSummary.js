import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import colors from "../../constants/colors";
import { getImageUrl, formatPrice } from "../../utils/helpers";

export default function OrderSummary({ items = [], summary }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Order Summary</Text>

      {items.map((item) => (
        <View key={item._id} style={styles.itemRow}>
          <Image
            source={{ uri: getImageUrl(item.product?.photo) }}
            style={styles.image}
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.product?.name}
            </Text>
            <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
          </View>
          <Text style={styles.itemPrice}>
            {formatPrice(item.product?.price * item.quantity)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />

      <Row label="Subtotal" value={summary?.subtotal} />
      <Row label="Delivery" value={summary?.delivery} />
      <Row label="GST" value={summary?.gst} />
      {summary?.discount > 0 && (
        <Row label="Discount" value={-summary.discount} />
      )}

      <View style={styles.divider} />

      <Row label="Total" value={summary?.total} bold />
    </View>
  );
}

const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={[styles.rowText, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.rowText, bold && styles.bold]}>
      {formatPrice(value)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
    color: colors.text,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 8,
    resizeMode: "contain",
    backgroundColor: colors.background,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  itemQty: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: colors.border,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  rowText: {
    fontSize: 14,
    color: colors.textLight,
  },
  bold: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.text,
  },
});
