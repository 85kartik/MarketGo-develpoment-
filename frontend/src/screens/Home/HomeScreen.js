import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  FlatList,
} from "react-native";

import Header from "../../components/Home/Header";
import SearchBar from "../../components/Home/SearchBar";
import BannerSlider from "../../components/Home/BannerSlider";
import SectionHeader from "../../components/Home/SectionHeader";
import CategoryCard from "../../components/Home/CategoryCard";
import HorizontalProductList from "../../components/Home/HorizontalProductList";
import OfferBanner from "../../components/Home/OfferBanner";

import Loader from "../../components/Common/Loader";

import homeService from "../../services/homeService";

export default function HomeScreen() {

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [home, setHome] = useState({
    banners: [],
    categories: [],
    featuredProducts: [],
    bestSelling: [],
    offers: [],
    newArrivals: [],
  });

  const loadData = async () => {
    try {

      const res =
        await homeService.getHomeData();

      setHome(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loader />;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadData();
          }}
        />
      }
    >

      <Header />

      <SearchBar />

      <BannerSlider
        banners={home.banners}
      />

      <SectionHeader
        title="Categories"
      />

      <FlatList
        horizontal
        data={home.categories}
        renderItem={({ item }) => (
          <CategoryCard item={item} />
        )}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />

      <OfferBanner />

      <SectionHeader
        title="Featured Products"
      />

      <HorizontalProductList
        data={home.featuredProducts}
      />

      <SectionHeader
        title="Best Selling"
      />

      <HorizontalProductList
        data={home.bestSelling}
      />

      <SectionHeader
        title="New Arrivals"
      />

      <HorizontalProductList
        data={home.newArrivals}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F8F9FA",
paddingHorizontal:16,
}

});