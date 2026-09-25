import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";

import ProductImageSlider from "../../components/Product/ProductImageSlider";
import ProductInfo from "../../components/Product/ProductInfo";
import QuantitySelector from "../../components/Product/QuantitySelector";
import AddToCartBar from "../../components/Product/AddToCartBar";
import Loader from "../../components/Common/Loader";
import ErrorView from "../../components/Common/ErrorView";

import productService from "../../services/productService";
import cartService from "../../services/cartService";
import { getImageUrl } from "../../utils/helpers";

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productService.getProduct(productId);
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
      setError("Couldn't load this product.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      setAddingToCart(true);
      await cartService.addToCart({ product: product._id, quantity });
      return true;
    } catch (err) {
      Alert.alert("Couldn't add to cart", "Please try again.");
      return false;
    } finally {
      setAddingToCart(false);
    }
  };

  const buyNow = async () => {
    try {
      setBuyingNow(true);
      await cartService.addToCart({ product: product._id, quantity });
      navigation.navigate("Cart", { screen: "Checkout" });
    } catch (err) {
      Alert.alert("Couldn't proceed to checkout", "Please try again.");
    } finally {
      setBuyingNow(false);
    }
  };

  if (loading) return <Loader />;
  if (error || !product) {
    return <ErrorView message={error || "Product not found."} onRetry={loadProduct} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ProductImageSlider images={[getImageUrl(product.photo)]} />
        <ProductInfo product={product} />
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </ScrollView>

      <AddToCartBar
        onCart={addToCart}
        onBuy={buyNow}
        cartLoading={addingToCart}
        buyLoading={buyingNow}
      />
    </View>
  );
}