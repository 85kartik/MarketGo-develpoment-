import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import cartService from "../../services/cartService";
import checkoutService from "../../services/checkoutService";
import Loader from "../../components/Common/Loader";
import ErrorView from "../../components/Common/ErrorView";
import InputField from "../../components/Forms/InputField";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import AddressCard from "../../components/Checkout/AddressCard";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import OrderSummary from "../../components/Checkout/OrderSummary";
import PlaceOrderButton from "../../components/Checkout/PlaceOrderButton";
import colors from "../../constants/colors";
import { formatAddress } from "../../utils/helpers";

export default function CheckoutScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placing, setPlacing] = useState(false);

  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [cartRes, addressRes] = await Promise.all([
        cartService.getCart(),
        checkoutService.getAddresses(),
      ]);

      setItems(cartRes.data.items || []);
      setSummary(cartRes.data.summary);

      const list = addressRes.data.addresses || [];
      setAddresses(list);

      const defaultAddr = list.find((a) => a.isDefault) || list[0];
      if (defaultAddr) setSelectedAddressId(defaultAddr._id);
      if (list.length === 0) setShowAddForm(true);
    } catch (err) {
      console.log(err);
      setError("Couldn't load checkout details.");
    } finally {
      setLoading(false);
    }
  };

  const saveNewAddress = async () => {
    const { fullName, phone, line1, city, state, pincode } = form;

    if (!fullName || !phone || !line1 || !city || !state || !pincode) {
      Alert.alert("Missing details", "Please fill in all required fields.");
      return;
    }

    try {
      setSavingAddress(true);
      const res = await checkoutService.addAddress({
        ...form,
        isDefault: addresses.length === 0,
      });

      const newAddress = res.data.address;
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newAddress._id);
      setShowAddForm(false);
      setForm({
        fullName: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      Alert.alert("Error", "Couldn't save this address. Please try again.");
    } finally {
      setSavingAddress(false);
    }
  };

  const placeOrder = async () => {
    const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

    if (!selectedAddress) {
      Alert.alert("Address required", "Please select or add a delivery address.");
      return;
    }

    if (items.length === 0) {
      Alert.alert("Cart is empty", "Add items to your cart before checking out.");
      return;
    }

    try {
      setPlacing(true);

      const orderRes = await checkoutService.checkout({
        products: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalAmount: summary.total,
        shippingAddress: `${selectedAddress.fullName}, ${formatAddress(
          selectedAddress
        )}. Phone: ${selectedAddress.phone}`,
        paymentMethod,
      });

      const order = orderRes.data.order;

      if (paymentMethod === "Online") {
        navigation.replace("Payment", { order });
      } else {
        await cartService.clearCart();
        navigation.replace("OrderSuccess", { order });
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Couldn't place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorView message={error} onRetry={loadData} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 15 }}>
      <Text style={styles.sectionTitle}>Delivery Address</Text>

      {addresses.map((addr) => (
        <AddressCard
          key={addr._id}
          address={addr}
          selected={selectedAddressId === addr._id}
          onSelect={() => setSelectedAddressId(addr._id)}
        />
      ))}

      {!showAddForm && (
        <TouchableOpacity
          style={styles.addAddressBtn}
          onPress={() => setShowAddForm(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.addAddressText}>Add New Address</Text>
        </TouchableOpacity>
      )}

      {showAddForm && (
        <View style={styles.formCard}>
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={form.fullName}
            onChangeText={(v) => setForm({ ...form, fullName: v })}
          />
          <InputField
            label="Phone"
            placeholder="9876543210"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(v) => setForm({ ...form, phone: v })}
          />
          <InputField
            label="Address Line 1"
            placeholder="House no., street"
            value={form.line1}
            onChangeText={(v) => setForm({ ...form, line1: v })}
          />
          <InputField
            label="Address Line 2 (optional)"
            placeholder="Landmark"
            value={form.line2}
            onChangeText={(v) => setForm({ ...form, line2: v })}
          />
          <InputField
            label="City"
            placeholder="City"
            value={form.city}
            onChangeText={(v) => setForm({ ...form, city: v })}
          />
          <InputField
            label="State"
            placeholder="State"
            value={form.state}
            onChangeText={(v) => setForm({ ...form, state: v })}
          />
          <InputField
            label="Pincode"
            placeholder="400001"
            keyboardType="number-pad"
            value={form.pincode}
            onChangeText={(v) => setForm({ ...form, pincode: v })}
          />

          <PrimaryButton
            title="Save Address"
            onPress={saveNewAddress}
            loading={savingAddress}
          />

          {addresses.length > 0 && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowAddForm(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Text style={styles.sectionTitle}>Payment Method</Text>
      <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />

      <OrderSummary items={items} summary={summary} />

      <PlaceOrderButton
        onPress={placeOrder}
        loading={placing}
        total={summary?.total}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 10,
    marginBottom: 12,
  },
  addAddressBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: "dashed",
    borderRadius: 14,
    justifyContent: "center",
    marginBottom: 10,
  },
  addAddressText: {
    color: colors.primary,
    fontWeight: "700",
    marginLeft: 8,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  cancelBtn: {
    alignItems: "center",
    marginTop: 12,
  },
  cancelText: {
    color: colors.textLight,
    fontWeight: "600",
  },
});
