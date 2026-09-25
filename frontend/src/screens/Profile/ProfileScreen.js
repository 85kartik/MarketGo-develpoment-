import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useAuth from "../../hooks/useAuth";
import colors from "../../constants/colors";

const MENU_ITEMS = [
  { key: "orders", icon: "bag-outline", label: "My Orders", route: "Orders" },
  { key: "edit", icon: "person-outline", label: "Edit Profile", route: "EditProfile" },
];

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <Ionicons name={item.icon} size={22} color={colors.text} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.menuItem} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.danger} />
          <Text style={[styles.menuLabel, { color: colors.danger }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 20,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  menuLabel: {
    flex: 1,
    marginLeft: 14,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
});
