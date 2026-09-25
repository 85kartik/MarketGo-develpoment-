import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import vendorService from "../../services/vendorService";

export default function EarningsScreen() {
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState({
    totalRevenue: 0,
    availableBalance: 0,
    pendingBalance: 0,
    withdrawnAmount: 0,
    payouts: [],
  });

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    try {
      const res = await vendorService.getRevenue();
      setEarnings(res.data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Unable to load earnings.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Earnings
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.amount}>
          ₹{earnings.availableBalance}
        </Text>

        <Text style={styles.label}>
          Available Balance
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <Card
          icon="payments"
          title="Total Revenue"
          value={`₹${earnings.totalRevenue}`}
          color="#16A34A"
        />

        <Card
          icon="hourglass-bottom"
          title="Pending"
          value={`₹${earnings.pendingBalance}`}
          color="#F59E0B"
        />

        <Card
          icon="account-balance-wallet"
          title="Withdrawn"
          value={`₹${earnings.withdrawnAmount}`}
          color="#2563EB"
        />
      </View>

      <Text style={styles.section}>
        Recent Payouts
      </Text>

      {earnings.payouts?.length === 0 ? (
        <Text style={styles.empty}>
          No payouts available.
        </Text>
      ) : (
        earnings.payouts.map((item, index) => (
          <View key={index} style={styles.payoutCard}>
            <View>
              <Text style={styles.payoutAmount}>
                ₹{item.amount}
              </Text>

              <Text style={styles.date}>
                {new Date(
                  item.createdAt
                ).toDateString()}
              </Text>
            </View>

            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status === "Completed"
                      ? "#16A34A"
                      : "#F59E0B",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

function Card({
  icon,
  title,
  value,
  color,
}) {
  return (
    <View style={styles.card}>
      <MaterialIcons
        name={icon}
        size={34}
        color={color}
      />

      <Text style={styles.cardValue}>
        {value}
      </Text>

      <Text style={styles.cardTitle}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 18,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: "#16A34A",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },

  amount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  label: {
    color: "#fff",
    marginTop: 8,
    fontSize: 17,
  },

  button: {
    backgroundColor: "#fff",
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },

  buttonText: {
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
  },

  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  cardTitle: {
    marginTop: 6,
    color: "#666",
    textAlign: "center",
  },

  section: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 18,
  },

  payoutCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  payoutAmount: {
    fontSize: 18,
    fontWeight: "700",
  },

  date: {
    marginTop: 4,
    color: "#777",
  },

  status: {
    fontWeight: "700",
  },

  empty: {
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },
});