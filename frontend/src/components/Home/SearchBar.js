import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function SearchBar() {
  return (
    <View style={styles.container}>

      <Ionicons
        name="search"
        size={22}
        color="#777"
      />

      <TextInput
        placeholder="Search products..."
        placeholderTextColor="#888"
        style={styles.input}
      />

    </View>
  );
}

const styles = StyleSheet.create({

container:{
marginTop:20,
backgroundColor:"#fff",
borderRadius:15,
height:55,
paddingHorizontal:15,
alignItems:"center",
flexDirection:"row",
elevation:2,
},

input:{
flex:1,
marginLeft:10,
fontSize:16,
}

});