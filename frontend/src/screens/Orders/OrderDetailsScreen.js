import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OrderStatusBadge from "../../components/Orders/OrderStatusBadge";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import colors from "../../constants/colors";
import { getImageUrl, formatPrice, formatDate } from "../../utils/helpers";

const CANCELLABLE_STATUSES = ["Pending", "Confirmed"];

export default function OrderDetailsScreen({ route, navigation }) {
  const [order, setOrder] = useState(route.params.order);

  const canCancel = CANCELLABLE_STATUSES.includes(order.orderStatus);
  const canTrack = !["Cancelled"].includes(order.orderStatus);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 15 }}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>
          Order #{order._id.slice(-8).toUpperCase()}
        </Text>
        <OrderStatusBadge status={order.orderStatus} />
      </View>
      <Text style={styles.date}>Placed on {formatDate(order.createdAt)}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>

        {order.products?.map((line, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Image
              source={{ uri: getImageUrl(line.product?.photo) }}
              style={styles.image}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {line.product?.name}
              </Text>
              <Text style={styles.itemQty}>Qty: {line.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              {formatPrice((line.product?.price || 0) * line.quantity)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.address}>{order.shippingAddress}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <Row label="Method" value={order.paymentMethod} />
        <Row label="Status" value={order.paymentStatus} />
        <Row label="Total Amount" value={formatPrice(order.totalAmount)} bold />
      </View>

      <View style={styles.actions}>
        {canTrack && (
          <SecondaryButton
            title="Track Order"
            onPress={() => navigation.navigate("TrackOrder", { order })}
            style={{ marginBottom: 12 }}
          />
        )}

        <SecondaryButton
          title="View Invoice"
          onPress={() => navigation.navigate("Invoice", { order })}
          style={{ marginBottom: 12 }}
        />

        {canCancel && (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() =>
              navigation.navigate("CancelOrder", {
                order,
                onCancelled: (updated) => setOrder(updated),
              })
            }
          >
            <Ionicons name="close-circle-outline" size={18} color={colors.danger} />
            <Text style={styles.cancelText}>Cancel Order</Text>
          </TouchableOpacity>
        )}

        {order.orderStatus === "Delivered" && (
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate("ReturnOrder", { order })}
          >
            <Ionicons name="return-up-back-outline" size={18} color={colors.textLight} />
            <Text style={styles.returnText}>Request Return</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const Row = ({ label, value, bold }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, bold && styles.rowValueBold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  date: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
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
    fontWeight: "700",
    color: colors.text,
  },
  address: {
    color: colors.textLight,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  rowLabel: {
    color: colors.textLight,
  },
  rowValue: {
    color: colors.text,
    fontWeight: "600",
  },
  rowValueBold: {
    fontSize: 16,
    fontWeight: "800",
  },
  actions: {
    marginTop: 6,
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  cancelText: {
    color: colors.danger,
    fontWeight: "700",
    marginLeft: 6,
  },
  returnText: {
    color: colors.textLight,
    fontWeight: "700",
    marginLeft: 6,
  },
});
