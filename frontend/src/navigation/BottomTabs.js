import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import ProductDetailsScreen from "../screens/Product/ProductDetailsScreen";
import AIChatScreen from "../screens/AI/AIChatScreen";

import CartScreen from "../screens/Cart/CartScreen";
import CheckoutScreen from "../screens/Cart/CheckoutScreen";
import PaymentScreen from "../screens/Cart/PaymentScreen";
import OrderSuccessScreen from "../screens/Cart/OrderSuccessScreen";

import OrdersScreen from "../screens/Orders/OrdersScreen";
import OrderDetailsScreen from "../screens/Orders/OrderDetailsScreen";
import TrackOrderScreen from "../screens/Orders/TrackOrderScreen";
import CancelOrderScreen from "../screens/Orders/CancelOrderScreen";
import ReturnOrderScreen from "../screens/Orders/ReturnOrderScreen";
import InvoiceScreen from "../screens/Orders/InvoiceScreen";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";

const Tab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator();
const CartStackNav = createNativeStackNavigator();
const OrdersStackNav = createNativeStackNavigator();
const ProfileStackNav = createNativeStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeMain" component={HomeScreen} />
      <HomeStackNav.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: true, title: "" }}
      />
      <HomeStackNav.Screen
        name="AIChat"
        component={AIChatScreen}
        options={{ headerShown: true, title: "MarketGo Assistant" }}
      />
    </HomeStackNav.Navigator>
  );
}

function CartStack() {
  return (
    <CartStackNav.Navigator screenOptions={{ headerShown: true }}>
      <CartStackNav.Screen
        name="CartMain"
        component={CartScreen}
        options={{ title: "My Cart", headerShown: false }}
      />
      <CartStackNav.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />
      <CartStackNav.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />
      <CartStackNav.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ title: "", headerBackVisible: false }}
      />
    </CartStackNav.Navigator>
  );
}

function OrdersStack() {
  return (
    <OrdersStackNav.Navigator screenOptions={{ headerShown: true }}>
      <OrdersStackNav.Screen
        name="OrdersMain"
        component={OrdersScreen}
        options={{ title: "My Orders", headerShown: false }}
      />
      <OrdersStackNav.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Order Details" }}
      />
      <OrdersStackNav.Screen
        name="TrackOrder"
        component={TrackOrderScreen}
        options={{ title: "Track Order" }}
      />
      <OrdersStackNav.Screen
        name="CancelOrder"
        component={CancelOrderScreen}
        options={{ title: "Cancel Order" }}
      />
      <OrdersStackNav.Screen
        name="ReturnOrder"
        component={ReturnOrderScreen}
        options={{ title: "Return Order" }}
      />
      <OrdersStackNav.Screen
        name="Invoice"
        component={InvoiceScreen}
        options={{ title: "Invoice" }}
      />
    </OrdersStackNav.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileStackNav.Navigator screenOptions={{ headerShown: true }}>
      <ProfileStackNav.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: "Profile", headerShown: false }}
      />
      <ProfileStackNav.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </ProfileStackNav.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home";
          if (route.name === "Cart") icon = "cart";
          if (route.name === "Orders") icon = "bag";
          if (route.name === "Profile") icon = "person";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}