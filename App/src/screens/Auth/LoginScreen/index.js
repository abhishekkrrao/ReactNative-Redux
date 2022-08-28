import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, TextInput, Text, StyleSheet, KeyboardAvoidingView, Image,
    Dimensions
} from "react-native";
import { CustomButton } from '../../../CustomModules/index';
import { LocalStorage, mapStateToProps, mapDispatchToProps } from "../../../../Util";
import { connect } from 'react-redux';
import { appColor, appDimension, CommonStyle, fontStyle } from "../../../../Styles";
import { SwipeButton } from "../../../Component";
import { initialWaveCenter, initialSideWidth } from '../../../Component/SwipeButton/Helper';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    cancelAnimation,
    interpolate,
    Extrapolate,
    withSpring,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Weave from "../../../Component/SwipeButton/Weave";
import Content from "../../../Component/SwipeButton/Content";


const { width } = Dimensions.get('window');
const LoginPage = (props) => {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");
    const [uidError, setUIDError] = useState("");
    const [passError, setPassError] = useState("");
    const centerY = useSharedValue(initialWaveCenter);
    const progress = useSharedValue(0);
    const isBack = useSharedValue(0);
    const maxDist = (width / 2) - initialSideWidth;
    useEffect(() => {
    }, [])

    const clearAll = () => {
        setPassword("");
        setUID("")
    }

    const handler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            // stop animating progress, this will also place "isBack" value in the
            // final state (we update isBack in progress animation callback)
            cancelAnimation(progress);
            ctx.dragX = 0;
            ctx.startY = isBack.value ? event.y : centerY.value;
        },
        onActive: (event, ctx) => {
            centerY.value = ctx.startY + event.translationY;
            if (isBack.value) {
                progress.value = interpolate(
                    event.translationX,
                    [0, maxDist],
                    [1, 0],
                    Extrapolate.CLAMP
                );
            } else {
                progress.value = interpolate(
                    event.translationX,
                    [-maxDist, 0],
                    [0.4, 0],
                    Extrapolate.CLAMP
                );
            }
        },
        onEnd: () => {
            let goBack;
            if (isBack.value) {
                goBack = progress.value > 0.5 ? 1 : 0;
            } else {
                // TODO: want to use a boolean here
                goBack = progress.value > 0.2 ? 1 : 0;
            }
            centerY.value = withSpring(initialWaveCenter);
            progress.value = withSpring(goBack ? 1 : 0, {}, () => {
                isBack.value = goBack;
            });
        }
    });

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
            <KeyboardAvoidingView behavior={"padding"} style={[styles.v1]}>

                {/* <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ width: 96, height: 96 }}
                        source={require("../../../../../assets/appicon.png")}></Image>
                </View> */}

                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: fontStyle.medium }]}>{"UserID*"}</Text>

                <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoFocus={true}
                    maxLength={15}
                    placeholder={"UserID*"}
                    style={[CommonStyle.txtInput, {
                        borderColor: (uidError) ? "red" : appColor.grey,
                        backgroundColor: appColor.white, borderRadius: 26
                    }]}
                    onChangeText={(value) => {
                        setUID(value);
                        setUIDError("");
                    }}
                    value={uID}>
                </TextInput>

                {uidError && <Text style={[CommonStyle.hintStyle, { marginTop: 10, paddingLeft: 10 }]}>{uidError}</Text>}



                <Text style={[{ marginTop: appDimension.pixel10 }, CommonStyle.headStyle, { fontFamily: fontStyle.medium }]}>{"Password*"}</Text>

                <TextInput
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    maxLength={15}
                    style={[CommonStyle.txtInput, {
                        borderColor: (passError) ? "red" : appColor.grey,
                        backgroundColor: appColor.white, borderRadius: 26
                    }]}
                    onChangeText={(value) => {
                        setPassword(value);
                        setPassError("");
                    }}
                    placeholder={"Password*"}
                    value={password}>
                </TextInput>

                {passError && <Text style={[CommonStyle.hintStyle, { marginTop: 10, paddingLeft: 10 }]}>{passError}</Text>}


                <View style={[styles.vAB3, { flexDirection: "row"}]}>
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
                </View>
            </KeyboardAvoidingView>
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