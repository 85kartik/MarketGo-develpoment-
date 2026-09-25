import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import vendorService from "../../services/vendorService";

export default function ProductManagementScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await vendorService.getProducts();
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = (id) => {
    Alert.alert(
      "Delete Product",
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
              await vendorService.deleteProduct(id);
              loadProducts();
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
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>
                My Products
              </Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  navigation.navigate("AddProduct")
                }
              >
                <MaterialIcons
                  name="add"
                  color="#fff"
                  size={26}
                />
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: item.images?.[0],
              }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.price}>
                ₹{item.price}
              </Text>

              <Text style={styles.stock}>
                Stock : {item.stock}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.edit}
                  onPress={() =>
                    navigation.navigate(
                      "EditProduct",
                      {
                        product: item,
                      }
                    )
                  }
                >
                  <MaterialIcons
                    name="edit"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.delete}
                  onPress={() =>
                    deleteProduct(item._id)
                  }
                >
                  <MaterialIcons
                    name="delete"
                    size={22}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
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

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  addButton: {
    backgroundColor: "#16A34A",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 12,
    elevation: 2,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  price: {
    color: "#16A34A",
    fontSize: 18,
    marginTop: 5,
    fontWeight: "700",
  },

  stock: {
    color: "#666",
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    marginTop: 10,
  },

  edit: {
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },

  delete: {
    backgroundColor: "#DC2626",
    padding: 8,
    borderRadius: 8,
  },
});