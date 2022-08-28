import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, TextInput, Text, StyleSheet,
    KeyboardAvoidingView, Image
} from "react-native";
import { CustomButton } from '../../../CustomModules';
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, LocalStorage } from '../../../../Util';
import { appColor, appDimension, CommonStyle } from "../../../../Styles";
import { BackButton } from "../../../Component";

function RegisterPage(props) {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [uidError, setUIDError] = useState("");
    const [passError, setPassError] = useState("");

    useEffect(() => { }, []);
    const clearAll = () => {
        setPassword("");
        setUID("")
    }
    const onClick = () => { props.navigation.pop() }
    const saveUser = () => {

        if (!uID) {
            setUIDError("User ID required*");
            return;
        }
        if (!password) {
            setPassError("Password required*");
            return;
        }

        LocalStorage.localStorageInstance.storeData("user", { islogin: true, uid: uID, password: password })
            .then(() => {
                LocalStorage.localStorageInstance.getData("user")
                    .then((value) => {
                        if (value != null) {
                            clearAll();
                            props.signIn(value);
                            props.setLoggedIn(true);
                        }
                    });
            });
    }

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appColor.backGround }]}>
            <View style={{ padding: 16 }}>
                <BackButton onClick={() => onClick()} screenTitle={"Register"} props={props} ></BackButton>
            </View>
            <KeyboardAvoidingView behavior={"padding"} style={[styles.v1]}>
                {/* <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 96, height: 96 }}
                        source={require("../../../../../assets/appicon.png")}></Image>
                </View> */}
                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: "Montserrat-Medium" }]}>{"UserID*"}</Text>

                <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoFocus={true}
                    maxLength={15}
                    placeholder={"UserID*"}
                    style={[CommonStyle.txtInput, { borderColor: (uidError) ? "red" : appColor.grey,
                    backgroundColor:appColor.white,borderRadius:26 }]}
                    onChangeText={(value) => {
                        setUID(value);
                        setUIDError("");
                    }}
                    value={uID}>
                </TextInput>

                {uidError && <Text style={[CommonStyle.hintStyle, { marginTop: 10,paddingLeft:10 }]}>{uidError}</Text>}



                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: "Montserrat-Medium" }]}>{"Password*"}</Text>

                <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    maxLength={15}
                    style={[CommonStyle.txtInput, { borderColor: (passError) ? "red" : appColor.grey,
                    backgroundColor:appColor.white,borderRadius:26 }]}
                    onChangeText={(value) => {
                        setPassword(value);
                        setPassError("");
                    }}
                    placeholder={"Password*"}
                    value={password}>
                </TextInput>

                {passError && <Text style={[CommonStyle.hintStyle, { marginTop: 10,paddingLeft:10 }]}>{passError}</Text>}


                <View style={[styles.vAB3, { flexDirection: "row" }]}>
                    <View style={{ flex: 1 }}>
                        <CustomButton
                            textStyle={[CommonStyle.btnTxt,{color:appColor.black}]}
                            value={"Login here"}
                            btnStyle={[styles.vABC1,{backgroundColor:appColor.white}]}
                            onPress={() => { props.navigation.pop() }}>
                        </CustomButton>
                    </View>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <CustomButton
                            textStyle={CommonStyle.btnTxt}
                            value={"Register"}
                            btnStyle={styles.vABC1}
                            onPress={() => { saveUser(); }}>
                        </CustomButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);


const styles = StyleSheet.create({
    v1: { flex: 1, padding: 20, alignItems: "center", flexDirection: "column", justifyContent: "center" },
    vAB1: { width: "100%", marginTop: 10 },
    vAB3: { width: "100%", justifyContent: "center", alignItems: "center" },
    vABC1: { marginTop: 20, width: "100%" }
})