import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.delivery}>Deliver To</Text>
        <Text style={styles.location}>📍 Your Location</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("AIChat")}
        >
          <Ionicons name="sparkles-outline" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  delivery: {
    fontSize: 13,
    color: "#777",
  },
  location: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    marginLeft: 10,
  },
});