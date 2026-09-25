import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function CategoryCard({
  item,
}) {
  return (
    <TouchableOpacity style={styles.card}>

      <Text style={styles.icon}>
        🛒
      </Text>

      <Text style={styles.name}>
        {item.name}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

card:{
width:90,
height:100,
backgroundColor:"#fff",
borderRadius:15,
justifyContent:"center",
alignItems:"center",
marginRight:15,
elevation:3,
},

icon:{
fontSize:30,
},

name:{
marginTop:8,
fontWeight:"600",
}

});