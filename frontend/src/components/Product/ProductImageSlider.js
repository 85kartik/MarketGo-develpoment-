import React from "react";
import { Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

export default function ProductImageSlider({ images = [] }) {
  return (
    <Swiper
      height={300}
      autoplay
      activeDotColor="#22C55E"
    >
      {images.map((img, index) => (
        <Image
          key={index}
          source={{ uri: img }}
          style={{
            width,
            height: 300,
            resizeMode: "contain",
          }}
        />
      ))}
    </Swiper>
  );
}