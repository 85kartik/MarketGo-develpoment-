import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import vendorService from "../../services/vendorService";

export default function VendorOrderDetailsScreen({
  route,
  navigation,
}) {
  const { order } = route.params;

  const [status, setStatus] = useState(order.status);

  const updateStatus = async () => {
    try {
      await vendorService.updateOrderStatus(order._id, {
        status,
      });

      Alert.alert(
        "Success",
        "Order status updated successfully."
      );

      navigation.goBack();
    } catch (err) {
      console.log(err);

      Alert.alert(
        "Error",
        "Unable to update order."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Order Details
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>
          {order.orderNumber || order._id}
        </Text>

        <Text style={styles.label}>Customer</Text>
        <Text style={styles.value}>
          {order.user?.name}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {order.user?.email}
        </Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>
          {order.shippingAddress?.phone}
        </Text>

        <Text style={styles.label}>
          Delivery Address
        </Text>

        <Text style={styles.value}>
          {order.shippingAddress?.address}
        </Text>

        <Text style={styles.label}>
          Payment Method
        </Text>

        <Text style={styles.value}>
          {order.paymentMethod}
        </Text>

        <Text style={styles.label}>
          Total Amount
        </Text>

        <Text style={styles.total}>
          ₹{order.totalAmount}
        </Text>
      </View>

      <Text style={styles.section}>
        Ordered Products
      </Text>

      {order.products?.map((item, index) => (
        <View key={index} style={styles.product}>
          <Text style={styles.productName}>
            {item.product?.name}
          </Text>

          <Text>
            Qty : {item.quantity}
          </Text>

          <Text>
            ₹{item.product?.price}
          </Text>
        </View>
      ))}

      <Text style={styles.section}>
        Update Status
      </Text>

      <View style={styles.pickerBox}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) =>
            setStatus(itemValue)
          }
        >
          <Picker.Item
            label="Pending"
            value="Pending"
          />

          <Picker.Item
            label="Confirmed"
            value="Confirmed"
          />

          <Picker.Item
            label="Packed"
            value="Packed"
          />

          <Picker.Item
            label="Shipped"
            value="Shipped"
          />

          <Picker.Item
            label="Out For Delivery"
            value="Out For Delivery"
          />

          <Picker.Item
            label="Delivered"
            value="Delivered"
          />

          <Picker.Item
            label="Cancelled"
            value="Cancelled"
          />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={updateStatus}
      >
        <Text style={styles.buttonText}>
          UPDATE ORDER STATUS
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    elevation: 2,
  },

  label: {
    marginTop: 12,
    color: "#666",
    fontWeight: "600",
  },

  value: {
    fontSize: 17,
    marginTop: 4,
  },

  total: {
    fontSize: 24,
    color: "#16A34A",
    fontWeight: "700",
    marginTop: 6,
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 20,
  },

  product: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  productName: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 5,
  },

  pickerBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },

  button: {
    backgroundColor: "#16A34A",
    padding: 18,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});