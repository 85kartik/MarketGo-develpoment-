import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function VendorDashboard({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Vendor Dashboard</Text>
      <Text style={styles.subHeading}>Welcome back 👋</Text>

      <View style={styles.cardContainer}>
        <DashboardCard title="Products" value="24" icon="inventory" color="#4CAF50" />
        <DashboardCard title="Orders" value="18" icon="shopping-cart" color="#2196F3" />
        <DashboardCard title="Revenue" value="₹12,450" icon="payments" color="#FF9800" />
        <DashboardCard title="Reviews" value="4.8★" icon="star" color="#E91E63" />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <ActionButton
        title="Manage Products"
        icon="inventory-2"
        onPress={() => navigation.navigate("ProductManagement")}
      />

      <ActionButton
        title="Orders"
        icon="shopping-bag"
        onPress={() => navigation.navigate("VendorOrders")}
      />

      <ActionButton
        title="Inventory"
        icon="warehouse"
        onPress={() => navigation.navigate("Inventory")}
      />

      <ActionButton
        title="Sales Report"
        icon="bar-chart"
        onPress={() => navigation.navigate("SalesReport")}
      />

      <ActionButton
        title="Coupons"
        icon="local-offer"
        onPress={() => navigation.navigate("Coupons")}
      />

      <ActionButton
        title="Profile"
        icon="person"
        onPress={() => navigation.navigate("VendorProfile")}
      />
    </ScrollView>
  );
}

function DashboardCard({ title, value, icon, color }) {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={34} color={color} />
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
}

function ActionButton({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.row}>
        <MaterialIcons name={icon} size={26} color="#2E7D32" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>

      <MaterialIcons
        name="keyboard-arrow-right"
        size={28}
        color="#888"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 18,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginTop: 10,
  },

  subHeading: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  cardTitle: {
    color: "#666",
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 18,
  },

  button: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "600",
    color: "#333",
  },
});