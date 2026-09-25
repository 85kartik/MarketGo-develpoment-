import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

export default function BannerSlider({ banners }) {
  return (
    <Swiper
      autoplay
      autoplayTimeout={4}
      showsPagination
      dotColor="#ddd"
      activeDotColor="#22C55E"
      style={styles.wrapper}
    >
      {banners.map((item) => (
        <Image
          key={item._id}
          source={{ uri: item.image }}
          style={styles.banner}
        />
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    marginTop: 20,
    borderRadius: 15,
  },

  banner: {
    width: width - 32,
    height: 180,
    borderRadius: 15,
    resizeMode: "cover",
    alignSelf: "center",
  },
});