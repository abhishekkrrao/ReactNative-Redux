import React, { useEffect, useState, memo } from "react";
import { SafeAreaView, View, TextInput, Text,StyleSheet } from "react-native";
import { CustomButton } from '../../../CustomModules/index';
function RegisterPage(props) {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ flex: 1, padding: 20, alignItems: "center", flexDirection: "column" }}>

                <Text style={{ width: "100%", marginTop: 5 }}>{"UserID*"}</Text>


                <TextInput
                    style={{
                        width: "100%", height: 48, marginTop: 5,
                        borderWidth: 1, borderColor: "#CCC", paddingLeft: 20
                    }}
                    onChangeText={(value) => { setUID(value) }}
                    value={uID}></TextInput>

                <Text style={{ width: "100%", marginTop: 5 }}>{"Password*"}</Text>

                <TextInput
                    style={{
                        width: "100%", height: 48, marginTop: 5,
                        borderWidth: 1, borderColor: "#CCC", paddingLeft: 20
                    }}
                    onChangeText={(value) => { setPassword(value) }}
                    value={password}></TextInput>


                <View style={{ width: "100%" }}>
                    <CustomButton textStyle={{ fontSize: 16, fontWeight: "900" }} value={"Go->"} btnStyle={{ marginTop: 20, width: 200, alignSelf: "flex-end" }} onPress={() => { }}></CustomButton>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default memo(RegisterPage, function comparator(prevProps, nextProps){
    console.log(prevProps)
    console.log(nextProps)
});