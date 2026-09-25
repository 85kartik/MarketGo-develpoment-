import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import vendorService from "../../services/vendorService";

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [discount, setDiscount] = useState(
    String(product.discount || 0)
  );
  const [stock, setStock] = useState(String(product.stock));
  const [description, setDescription] = useState(
    product.description
  );

  const [image, setImage] = useState(
    product.images?.[0] || ""
  );

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append(
        "description",
        description
      );

      if (
        image &&
        !image.startsWith("http")
      ) {
        formData.append("photo", {
          uri: image,
          name: "product.jpg",
          type: "image/jpeg",
        });
      }

      await vendorService.updateProduct(
        product._id,
        formData
      );

      Alert.alert(
        "Success",
        "Product Updated Successfully"
      );

      navigation.goBack();
    } catch (err) {
      console.log(err);

      Alert.alert(
        "Error",
        "Unable to update product"
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <Text style={styles.title}>
        Edit Product
      </Text>

      <TouchableOpacity
        style={styles.imageBox}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <MaterialIcons
            name="add-a-photo"
            size={40}
            color="#777"
          />
        )}
      </TouchableOpacity>

      <Input
        label="Product Name"
        value={name}
        onChangeText={setName}
      />

      <Input
        label="Brand"
        value={brand}
        onChangeText={setBrand}
      />

      <Input
        label="Category"
        value={category}
        onChangeText={setCategory}
      />

      <Input
        label="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Input
        label="Discount (%)"
        value={discount}
        keyboardType="numeric"
        onChangeText={setDiscount}
      />

      <Input
        label="Stock"
        value={stock}
        keyboardType="numeric"
        onChangeText={setStock}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={styles.description}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={updateProduct}
      >
        <Text style={styles.buttonText}>
          UPDATE PRODUCT
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  onChangeText,
  keyboardType,
}) {
  return (
    <>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  imageBox: {
    alignSelf: "center",
    width: 180,
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    elevation: 2,
  },

  description: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
    elevation: 2,
  },

  button: {
    backgroundColor: "#16A34A",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },
});