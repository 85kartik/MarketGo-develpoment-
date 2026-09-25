import React from "react";
import { FlatList } from "react-native";

import ProductCard from "./ProductCard";

export default function HorizontalProductList({
  data,
}) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ProductCard item={item} />
      )}
    />
  );
}