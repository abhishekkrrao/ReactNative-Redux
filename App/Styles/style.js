import { StyleSheet } from "react-native";
import { appDimension } from "./Dimensions";
import { appColor } from "./Color";
export default StyleSheet.create({


    txtInput: {
        width: "100%", height: appDimension.pixel55, marginTop: appDimension.pixel10,
        borderWidth: 1, borderColor: appColor.grey, paddingLeft: appDimension.pixel20
    },
    headStyle: { fontSize: appDimension.pixel18, width: "100%" },
    hintStyle: { fontSize: appDimension.pixel10, width: "100%", color: "red" },
    container: { flex: 1, backgroundColor: appColor.white },
    btnTxt: { fontSize: 16, fontWeight: "900" }

})