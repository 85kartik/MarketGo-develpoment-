import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import colors from "../../constants/colors";

export default function SectionHeader({
  title,
  onPress,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAll}>
          See All
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

container:{
marginTop:25,
marginBottom:15,
flexDirection:"row",
justifyContent:"space-between",
},

title:{
fontSize:20,
fontWeight:"700",
},

seeAll:{
color:colors.primary,
fontWeight:"600",
}

});