import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import vendorService from "../../services/vendorService";

export default function VendorProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await vendorService.getVendorProfile();
      setVendor(res.data.vendor);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{
            uri:
              vendor?.profileImage ||
              "https://via.placeholder.com/150",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {vendor?.shopName}
        </Text>

        <Text style={styles.email}>
          {vendor?.email}
        </Text>

        <Text style={styles.phone}>
          {vendor?.phone}
        </Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditVendorProfile", {
              vendor,
            })
          }
        >
          <MaterialIcons
            name="edit"
            color="#fff"
            size={20}
          />

          <Text style={styles.editText}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <InfoRow
          icon="store"
          title="Shop Name"
          value={vendor?.shopName}
        />

        <InfoRow
          icon="location-on"
          title="Address"
          value={vendor?.address}
        />

        <InfoRow
          icon="category"
          title="Business Type"
          value={vendor?.businessType}
        />

        <InfoRow
          icon="verified-user"
          title="GST Number"
          value={vendor?.gstNumber}
        />

        <InfoRow
          icon="account-balance"
          title="Bank"
          value={vendor?.bankName}
        />

        <InfoRow
          icon="credit-card"
          title="Account Number"
          value={vendor?.accountNumber}
        />

        <InfoRow
          icon="code"
          title="IFSC"
          value={vendor?.ifscCode}
        />
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, title, value }) {
  return (
    <View style={styles.row}>
      <MaterialIcons
        name={icon}
        size={24}
        color="#16A34A"
      />

      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={styles.label}>
          {title}
        </Text>

        <Text style={styles.value}>
          {value || "-"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#16A34A",
    alignItems: "center",
    paddingVertical: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },

  name: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    marginTop: 15,
  },

  email: {
    color: "#fff",
    marginTop: 5,
  },

  phone: {
    color: "#fff",
    marginTop: 3,
  },

  editButton: {
    flexDirection: "row",
    backgroundColor: "#0F8A3D",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },

  section: {
    padding: 20,
  },

  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
  },

  label: {
    color: "#666",
    fontSize: 14,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 4,
  },
});