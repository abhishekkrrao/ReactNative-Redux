import React, { useEffect, useState, useRef } from "react";
import {
    SafeAreaView, View, TextInput, Text, StyleSheet, KeyboardAvoidingView, Image,
    Dimensions, Pressable, Animated
} from "react-native";
import { CustomButton } from '../../../CustomModules/index';
import { LocalStorage, mapStateToProps, mapDispatchToProps } from "../../../../Util";
import { connect } from 'react-redux';
import { appColor, appDimension, CommonStyle, fontStyle } from "../../../../Styles";
import Ionicons from "react-native-vector-icons/Ionicons";



const { width } = Dimensions.get('window');
const LoginPage = (props) => {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [uidError, setUIDError] = useState("");
    const [passError, setPassError] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        startAnimation();
        console.log(fadeAnim)
    }, [fadeAnim])

    const startAnimation = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }
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
            <Text
                onPress={() => {
                    const obj = {
                        islogin: true,
                        user: { islogin: true }
                    };
                    props.signIn(obj);
                }}
                style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, {
                    fontFamily: fontStyle.medium, textAlign: "right",
                    paddingEnd: 26, fontFamily: fontStyle.bold
                }]}>{"Skip"}</Text>
            <View behavior={"padding"} style={[styles.v1]}>

                {/* <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 96, height: 96 }}
                        source={require("../../../../../assets/appicon.png")}></Image>
                </View> */}

                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: fontStyle.medium }]}>{"UserID*"}</Text>

                <Animated.View style={{ width: "100%", opacity: fadeAnim }}>
                    <TextInput
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        autoFocus={true}
                        maxLength={15}
                        placeholder={"UserID*"}
                        style={[CommonStyle.txtInput, {
                            borderColor: (uidError) ? appColor.lightRed : appColor.grey,
                            backgroundColor: appColor.white, borderRadius: 26
                        }]}
                        onChangeText={(value) => {
                            setUID(value);
                            setUIDError("");
                        }}
                        value={uID}>
                    </TextInput>
                </Animated.View>

                {uidError && <Text style={[CommonStyle.hintStyle, { marginTop: 10, paddingLeft: 10 }]}>{uidError}</Text>}



                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: fontStyle.medium }]}>{"Password*"}</Text>

                <Animated.View style={{ width: "100%", opacity: fadeAnim }}>
                    <TextInput
                        secureTextEntry={isVisible}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        maxLength={15}
                        style={[CommonStyle.txtInput, {
                            borderColor: (passError) ? appColor.lightRed : appColor.grey,
                            backgroundColor: appColor.white, borderRadius: 26
                        }]}
                        onChangeText={(value) => {
                            setPassword(value);
                            setPassError("");
                        }}
                        placeholder={"Password*"}
                        value={password}>
                    </TextInput>
                    <Pressable onPress={() => setIsVisible(!isVisible)} style={{ position: "absolute", right: 26, top: 26 }}>
                        {!isVisible && <Ionicons name={"eye"} color={appColor.black} size={24}></Ionicons>}
                        {isVisible && <Ionicons name={"eye-off"} color={appColor.black} size={24}></Ionicons>}
                    </Pressable>
                </Animated.View>

                {passError && <Text style={[CommonStyle.hintStyle, { marginTop: 10, paddingLeft: 10 }]}>{passError}</Text>}


                <Animated.View style={[styles.vAB3, { flexDirection: "row", opacity: fadeAnim }]}>
                    <View style={{ flex: 1 }}>
                        <CustomButton
                            textStyle={[CommonStyle.btnTxt, { color: appColor.black }]}
                            value={"Register"}
                            btnStyle={[styles.vABC1, { backgroundColor: appColor.white }]}
                            onPress={() => { props.navigation.navigate("RegisterPage") }}>
                        </CustomButton>
                    </View>

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <CustomButton
                            textStyle={CommonStyle.btnTxt}
                            value={"Login"}
                            btnStyle={styles.vABC1}
                            onPress={() => { saveUser(); }}>
                        </CustomButton>
                    </View>
                </Animated.View>


                <Animated.View style={{ width: "100%", alignItems: "center", marginTop: 35, opacity: fadeAnim }}>
                    <Text style={{ color: "#000", fontFamily: fontStyle.medium, fontSize: appDimension.pixel13 }}>{"---- Login with Social Accounts ----"}</Text>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1, marginEnd: 5 }}>
                            <CustomButton
                                textStyle={CommonStyle.btnTxt}
                                value={"FB Login"}
                                btnStyle={styles.vABC1}
                                onPress={() => { saveUser(); }}>
                            </CustomButton>
                        </View>
                        <View style={[{ flex: 1 }]}>
                            <CustomButton
                                textStyle={CommonStyle.btnTxt}
                                value={"Apple"}
                                btnStyle={styles.vABC1}
                                onPress={() => { saveUser(); }}>
                            </CustomButton>
                        </View>

                    </View>
                </Animated.View>

            </View>
        </SafeAreaView>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    v1: { flex: 1, padding: 20, alignItems: "center", flexDirection: "column", justifyContent: "center" },
    vAB1: { width: "100%", marginTop: 10 },
    vAB3: { width: "100%", justifyContent: "center", alignItems: "center" },
    vABC1: { marginTop: 20, width: "100%" }
})