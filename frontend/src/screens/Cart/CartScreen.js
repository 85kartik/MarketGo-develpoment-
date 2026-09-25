import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from "react-native";

import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";
import CouponBox from "../../components/Cart/CouponBox";
import CheckoutButton from "../../components/Cart/CheckoutButton";
import EmptyCart from "../../components/Cart/EmptyCart";
import Loader from "../../components/Common/Loader";

import cartService from "../../services/cartService";

export default function CartScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [cart, setCart] = useState([]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    delivery: 0,
    discount: 0,
    gst: 0,
    total: 0,
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await cartService.getCart();

      setCart(res.data.items);

      setSummary(res.data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) return <Loader />;

  if (cart.length === 0)
    return <EmptyCart navigation={navigation} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadCart();
            }}
          />
        }
        renderItem={({ item }) => (
          <CartItem
            item={item}
            reload={loadCart}
          />
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              My Cart ({cart.length})
            </Text>

            <CouponBox reload={loadCart} />
          </>
        }
        ListFooterComponent={
          <>
            <CartSummary summary={summary} />

            <CheckoutButton
              onPress={() =>
                navigation.navigate("Checkout")
              }
            />
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
});