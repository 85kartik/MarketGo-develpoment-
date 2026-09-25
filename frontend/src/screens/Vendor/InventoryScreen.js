import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import vendorService from "../../services/vendorService";

export default function InventoryScreen() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const res = await vendorService.getInventory();

      const products = res.data.products || [];

      setInventory(products);
      setFilteredInventory(products);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  const searchProduct = (text) => {
    setSearch(text);

    const filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredInventory(filtered);
  };

  const updateStock = async (item, change) => {
    const newStock = Math.max(0, item.stock + change);

    try {
      await vendorService.updateInventory(item._id, {
        stock: newStock,
      });

      loadInventory();
    } catch (err) {
      Alert.alert("Error", "Unable to update stock.");
    }
  };

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <Text
          style={[
            styles.stock,
            item.stock < 10 && { color: "#DC2626" },
          ]}
        >
          Stock : {item.stock}
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.minus}
          onPress={() => updateStock(item, -1)}
        >
          <MaterialIcons
            name="remove"
            color="#fff"
            size={22}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.plus}
          onPress={() => updateStock(item, 1)}
        >
          <MaterialIcons
            name="add"
            color="#fff"
            size={22}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Inventory
      </Text>

      <TextInput
        placeholder="Search Product..."
        value={search}
        onChangeText={searchProduct}
        style={styles.search}
      />

      <FlatList
        data={filteredInventory}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 16,
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

  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    elevation: 2,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  category: {
    color: "#777",
    marginTop: 5,
  },

  stock: {
    marginTop: 8,
    fontWeight: "700",
    color: "#16A34A",
  },

  buttons: {
    flexDirection: "row",
  },

  minus: {
    width: 40,
    height: 40,
    backgroundColor: "#DC2626",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  plus: {
    width: 40,
    height: 40,
    backgroundColor: "#16A34A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});