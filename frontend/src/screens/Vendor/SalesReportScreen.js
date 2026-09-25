import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import vendorService from "../../services/vendorService";

export default function SalesReportScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [report, setReport] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalProducts: 0,
    monthlyRevenue: 0,
    todayRevenue: 0,
    topProducts: [],
  });

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await vendorService.getAnalytics();

      setReport(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refresh = () => {
    setRefreshing(true);
    loadReport();
  };

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
        />
      }
    >
      <Text style={styles.title}>
        Sales Report
      </Text>

      <View style={styles.grid}>
        <Card
          title="Today's Revenue"
          value={`₹${report.todayRevenue}`}
          color="#16A34A"
          icon="payments"
        />

        <Card
          title="Monthly Revenue"
          value={`₹${report.monthlyRevenue}`}
          color="#2563EB"
          icon="bar-chart"
        />

        <Card
          title="Total Revenue"
          value={`₹${report.totalRevenue}`}
          color="#7C3AED"
          icon="account-balance-wallet"
        />

        <Card
          title="Orders"
          value={report.totalOrders}
          color="#F97316"
          icon="shopping-cart"
        />

        <Card
          title="Completed"
          value={report.completedOrders}
          color="#059669"
          icon="check-circle"
        />

        <Card
          title="Cancelled"
          value={report.cancelledOrders}
          color="#DC2626"
          icon="cancel"
        />

        <Card
          title="Products"
          value={report.totalProducts}
          color="#0EA5E9"
          icon="inventory"
        />
      </View>

      <Text style={styles.heading}>
        Top Selling Products
      </Text>

      {report.topProducts?.map((item, index) => (
        <View
          key={index}
          style={styles.product}
        >
          <Text style={styles.productName}>
            {item.name}
          </Text>

          <Text style={styles.productSales}>
            Sold : {item.totalSold}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function Card({
  title,
  value,
  color,
  icon,
}) {
  return (
    <View style={styles.card}>
      <MaterialIcons
        name={icon}
        size={34}
        color={color}
      />

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
  },

  label: {
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 20,
  },

  product: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
  },

  productName: {
    fontSize: 17,
    fontWeight: "700",
  },

  productSales: {
    marginTop: 5,
    color: "#16A34A",
    fontWeight: "600",
  },
});