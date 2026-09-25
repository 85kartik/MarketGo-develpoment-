import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import vendorService from "../../services/vendorService";

export default function CouponsScreen({ navigation }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const res = await vendorService.getCoupons();
      setCoupons(res.data.coupons || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = (id) => {
    Alert.alert(
      "Delete Coupon",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await vendorService.deleteCoupon(id);
              loadCoupons();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  };

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#16A34A"
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Coupons
        </Text>

        <TouchableOpacity
          style={styles.add}
          onPress={() =>
            navigation.navigate("AddCoupon")
          }
        >
          <MaterialIcons
            name="add"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={coupons}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.code}>
                {item.code}
              </Text>

              <Text style={styles.discount}>
                {item.discount}% OFF
              </Text>

              <Text style={styles.expiry}>
                Expires :
                {" "}
                {new Date(
                  item.expiryDate
                ).toDateString()}
              </Text>

              <Text
                style={[
                  styles.status,
                  {
                    color: item.isActive
                      ? "#16A34A"
                      : "#DC2626",
                  },
                ]}
              >
                {item.isActive
                  ? "Active"
                  : "Inactive"}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "EditCoupon",
                    { coupon: item }
                  )
                }
              >
                <MaterialIcons
                  name="edit"
                  size={25}
                  color="#2563EB"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() =>
                  deleteCoupon(item._id)
                }
              >
                <MaterialIcons
                  name="delete"
                  size={25}
                  color="#DC2626"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
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

  add: {
    backgroundColor: "#16A34A",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  code: {
    fontSize: 20,
    fontWeight: "700",
  },

  discount: {
    color: "#16A34A",
    fontSize: 17,
    marginTop: 6,
    fontWeight: "600",
  },

  expiry: {
    marginTop: 6,
    color: "#666",
  },

  status: {
    marginTop: 8,
    fontWeight: "700",
  },
});