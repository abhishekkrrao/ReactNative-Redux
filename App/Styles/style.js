import { StyleSheet } from "react-native";
import { appDimension } from "./Dimensions";
import { appColor } from "./Color";
export default StyleSheet.create({
    txtInput: {
        width: "100%", height: appDimension.pixel55, marginTop: appDimension.pixel10,
        borderWidth: 1, borderColor: appColor.grey, paddingLeft: appDimension.pixel20
    },
    headStyle: { fontSize: appDimension.pixel18, width: "100%", fontFamily: "Montserrat-Bold" },
    hintStyle: { fontSize: appDimension.pixel11, width: "100%", color: appColor.lightRed, fontFamily: "Montserrat-Medium" },
    container: { flex: 1, backgroundColor: appColor.white },
    btnTxt: { fontSize: appDimension.pixel15, fontFamily: "Montserrat-Bold", letterSpacing: 2 },
    shadowIOSStyle: {
        shadowColor: "#000", shadowOffset: { height: 1.5, width: 0 },
        shadowOpacity: 0.15, overflow: "hidden", borderWidth: 1, borderColor: "#FFF"
    },
    iosShadow:{
        shadowColor:"#000",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        }
    }
})