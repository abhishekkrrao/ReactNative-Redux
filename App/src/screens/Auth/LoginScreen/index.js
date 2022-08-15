import React, { useEffect, useState, memo } from "react";
import { SafeAreaView, View, TextInput, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { CustomButton } from '../../../CustomModules/index';
import { LocalStorage, mapStateToProps, mapDispatchToProps } from "../../../../Util";
import { connect } from 'react-redux';
import { appColor, appDimension, CommonStyle } from "../../../../Styles";


const LoginPage = (props) => {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [uidError, setUIDError] = useState("");
    const [passError, setPassError] = useState("");


    useEffect(() => {
    }, [])

    const clearAll = () => {
        setPassword("");
        setUID("")
    }

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
            <KeyboardAvoidingView behavior={"padding"} style={[styles.v1]}>

                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle]}>{"UserID*"}</Text>

                <TextInput
                    style={[CommonStyle.txtInput, { borderColor: (uidError) ? "red" : appColor.grey }]}
                    onChangeText={(value) => {
                        setUID(value);
                        setUIDError("");
                    }}
                    value={uID}>
                </TextInput>

                {uidError && <Text style={[CommonStyle.hintStyle, { marginTop: 10 }]}>{uidError}</Text>}



                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle]}>{"Password*"}</Text>

                <TextInput
                    style={[CommonStyle.txtInput, { borderColor: (passError) ? "red" : appColor.grey }]}
                    onChangeText={(value) => {
                        setPassword(value);
                        setPassError("");
                    }}
                    value={password}>
                </TextInput>

                {passError && <Text style={[CommonStyle.hintStyle, { marginTop: 10 }]}>{passError}</Text>}


                <View style={styles.vAB3}>
                    <CustomButton
                        textStyle={CommonStyle.btnTxt}
                        value={"Go->"}
                        btnStyle={styles.vABC1}
                        onPress={() => { saveUser(); }}>
                    </CustomButton>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    v1: { flex: 1, padding: 20, alignItems: "center", flexDirection: "column", justifyContent: "center" },
    vAB1: { width: "100%", marginTop: 10 },
    vAB3: { width: "100%" },
    vABC1: { marginTop: 20, width: 200, alignSelf: "flex-end" }
})