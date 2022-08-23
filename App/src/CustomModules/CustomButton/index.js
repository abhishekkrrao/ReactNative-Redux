import { StyleSheet, TouchableOpacity, Text, View, Pressable } from "react-native";
import React from "react"
function CustomButton({ btnStyle, textStyle, onPress, value = "Submit" }) {
    return (
        <Pressable
            onPress={onPress}>
            <View style={[styles.buttonStyle, btnStyle]}>
                <Text style={[styles.TextStyle, { fontFamily: "Montserrat-Medium" }, textStyle]}>{value}</Text>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    buttonStyle: {
        width: "100%", height: 48, borderRadius: 25, padding: 5,
        justifyContent: "center", alignItems: "center",
        backgroundColor: "#000"
    },
    TextStyle: {
        textAlign: "center", color: "#FFF", fontSize: 21
    },
});
export default CustomButton;