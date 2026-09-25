import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import orderService from "../../services/orderService";
import OrderCard from "../../components/Orders/OrderCard";
import EmptyOrders from "../../components/Orders/EmptyOrders";
import Loader from "../../components/Common/Loader";
import ErrorView from "../../components/Common/ErrorView";
import colors from "../../constants/colors";

export default function OrdersScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      setError(null);
      const res = await orderService.getOrders();
      const list = res.data.orders || [];
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(list);
    } catch (err) {
      console.log(err);
      setError("Couldn't load your orders.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  if (loading) return <Loader />;
  if (error) return <ErrorView message={error} onRetry={loadOrders} />;
  if (orders.length === 0) return <EmptyOrders navigation={navigation} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 15 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadOrders();
            }}
          />
        }
        ListHeaderComponent={
          <Text style={styles.title}>My Orders ({orders.length})</Text>
        }
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate("OrderDetails", { order: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 16,
  },
});
