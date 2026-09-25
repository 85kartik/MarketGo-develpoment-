import { StyleSheet } from "react-native";
import colors from "../constants/colors";

export default StyleSheet.create({

    container:{

        flex:1,

        backgroundColor:colors.background,

        padding:20,

    },

    title:{

        fontSize:28,

        fontWeight:"700",

        color:colors.text,

    },

    subtitle:{

        fontSize:16,

        color:colors.textLight,

        marginTop:5,

        marginBottom:25,

    },

    card:{

        backgroundColor:colors.white,

        borderRadius:15,

        padding:20,

        marginVertical:10,

        shadowColor:"#000",

        shadowOffset:{width:0,height:2},

        shadowOpacity:0.1,

        shadowRadius:8,

        elevation:4,

    }

});