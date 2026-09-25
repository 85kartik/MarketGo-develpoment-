import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import { formatAddress } from "../../utils/helpers";

export default function AddressCard({ address, selected, onSelect, onDelete }) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{address.fullName}</Text>
          {address.isDefault && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Default</Text>
            </View>
          )}
        </View>

        <Text style={styles.text}>{formatAddress(address)}</Text>
        <Text style={styles.text}>Phone: {address.phone}</Text>
      </View>

      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "flex-start",
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: "#EFF6FF",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  info: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.text,
  },
  badge: {
    marginLeft: 8,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  text: {
    color: colors.textLight,
    marginTop: 4,
    fontSize: 13,
  },
  deleteBtn: {
    padding: 4,
  },
});
