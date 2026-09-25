import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import vendorService from "../../services/vendorService";

export default function VendorOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await vendorService.getOrders();
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("VendorOrderDetails", {
          order: item,
        })
      }
    >
      <View style={styles.topRow}>
        <Text style={styles.orderId}>
          #{item.orderNumber || item._id.slice(-6)}
        </Text>

        <View
          style={[
            styles.status,
            {
              backgroundColor:
                item.status === "Delivered"
                  ? "#16A34A"
                  : item.status === "Cancelled"
                  ? "#DC2626"
                  : "#F59E0B",
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.customer}>
        {item.user?.name}
      </Text>

      <Text style={styles.date}>
        {new Date(item.createdAt).toDateString()}
      </Text>

      <View style={styles.bottom}>
        <Text style={styles.total}>
          ₹{item.totalAmount}
        </Text>

        <MaterialIcons
          name="keyboard-arrow-right"
          size={28}
          color="#999"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Vendor Orders
        </Text>

        <TouchableOpacity onPress={loadOrders}>
          <MaterialIcons
            name="refresh"
            size={28}
            color="#16A34A"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 15,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontWeight: "700",
    fontSize: 18,
  },

  status: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
  },

  customer: {
    fontSize: 17,
    marginTop: 12,
    color: "#333",
  },

  date: {
    color: "#777",
    marginTop: 5,
  },

  bottom: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  total: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16A34A",
  },
});