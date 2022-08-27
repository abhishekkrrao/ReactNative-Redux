import React, { useEffect, useState } from "react";
import { SafeAreaView, View, TextInput, Text, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { CustomButton } from '../../../CustomModules/index';
import { LocalStorage, mapStateToProps, mapDispatchToProps } from "../../../../Util";
import { connect } from 'react-redux';
import { appColor, appDimension, CommonStyle } from "../../../../Styles";
import { BackButton, MyLoader } from "../../../Component";


const EditProfilePage = (props) => {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [uidError, setUIDError] = useState("");
    const [passError, setPassError] = useState("");
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        props.navigation.pop()
    }


    const setState = () => {
        LocalStorage.localStorageInstance.getData("user")
            .then((value) => {
                if (value != null) {
                    clearAll();
                    console.log(value);
                    setUID(value?.uid);
                    setPassword(value?.password);
                }
            });
    }

    useEffect(() => {
        try {
            setState();
        } catch (error) {

        }
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
        setLoading(true)
        LocalStorage.localStorageInstance.storeData("user", { islogin: true, uid: uID, password: password })
            .then(() => {
                LocalStorage.localStorageInstance.getData("user")
                    .then((value) => {
                        if (value != null) {
                            setUID(value?.uid);
                            setPassword(value?.password);
                            setTimeout(() => { setLoading(false) }, 3000)
                        }
                    });
            });
    }

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appColor.backGround }]}>
            <View style={{ padding: 20 }}>
                <BackButton onClick={() => onClick()} screenTitle={"Edit Your Profile"} props={props} ></BackButton>
            </View>
            <KeyboardAvoidingView behavior={"padding"} style={[styles.v1]}>

               
                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: "Montserrat-Medium" }]}>{"UserID*"}</Text>

                <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoFocus={true}
                    maxLength={15}
                    placeholder={"UserID*"}
                    style={[CommonStyle.txtInput, {
                        borderColor: (uidError) ? "red" : appColor.grey,
                        backgroundColor: "#FFF", borderRadius: 26
                    }]}
                    onChangeText={(value) => {
                        setUID(value);
                        setUIDError("");
                    }}
                    value={uID}>
                </TextInput>

                {uidError && <Text style={[CommonStyle.hintStyle, { marginTop: 10 }]}>{uidError}</Text>}



                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: "Montserrat-Medium" }]}>{"Password*"}</Text>
                {loading && <MyLoader></MyLoader>}
                <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    maxLength={15}
                    style={[CommonStyle.txtInput, {
                        borderColor: (passError) ? "red" : appColor.grey,
                        backgroundColor: "#FFF", borderRadius: 26
                    }]}
                    onChangeText={(value) => {
                        setPassword(value);
                        setPassError("");
                    }}
                    placeholder={"Password*"}
                    value={password}>
                </TextInput>

                {passError && <Text style={[CommonStyle.hintStyle, { marginTop: 10 }]}>{passError}</Text>}

             
                <View style={[styles.vAB3, { flexDirection: "row" }]}>
                    <View style={{ flex: 1 }}>
                        {/* <CustomButton
                            textStyle={CommonStyle.btnTxt}
                            value={"Create an account"}
                            btnStyle={styles.vABC1}
                            onPress={() => { saveUser(); }}>
                        </CustomButton> */}
                    </View>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <CustomButton
                            textStyle={CommonStyle.btnTxt}
                            value={"Submit"}
                            btnStyle={styles.vABC1}
                            onPress={() => { saveUser(); }}>
                        </CustomButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);

const styles = StyleSheet.create({
    v1: { flex: 1, padding: 20, alignItems: "center", flexDirection: "column", justifyContent: "center" },
    vAB1: { width: "100%", marginTop: 10 },
    vAB3: { width: "100%", justifyContent: "center", alignItems: "center" },
    vABC1: { marginTop: 20, width: "100%" }
})