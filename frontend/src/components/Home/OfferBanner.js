import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import colors from "../../constants/colors";

export default function OfferBanner() {
  return (
    <View style={styles.container}>

      <Text style={styles.offer}>
        🔥 Today's Offer
      </Text>

      <Text style={styles.discount}>
        Flat 30% OFF
      </Text>

      <Text style={styles.desc}>
        On Grocery above ₹999
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

container:{
backgroundColor:"#22C55E",
padding:20,
borderRadius:20,
marginVertical:20,
},

offer:{
color:"#fff",
fontSize:16,
},

discount:{
fontSize:30,
fontWeight:"700",
color:"#fff",
marginTop:5,
},

desc:{
marginTop:5,
color:"#fff",
fontSize:15,
}

});