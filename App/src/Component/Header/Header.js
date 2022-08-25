import { View, Pressable, Text, Platform, TextInput } from 'react-native';
import React, { useEffect, useState } from "react";
import { LocalStorage, mapStateToProps, mapDispatchToProps } from '../../../Util';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


function Header({ props, style, home, issearch, onChange = () => null, value, isTrending }) {



    useEffect(() => {
        // console.log(props)

        console.log(home, issearch, value)
    }, []);

    const logOut = () => {
        try {
            LocalStorage.localStorageInstance.clearAll()
                .then(() => {
                    try {
                        const value = { islogin: false };
                        props.signIn(value);
                        props.setLoggedIn(false);
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={[{ width: "100%", backgroundColor: "#40241a", height: Platform.OS == "ios" ? 96 : 70, marginTop: Platform.OS == "ios" ? -50 : 0 }]}>


            {(issearch == false) && <View style={{ flex: 1, flexDirection: "row" }}>
                {!home && <Pressable
                    onPress={() => props.navigation.pop()}
                    style={{
                        flex: 1, height: Platform.OS == "ios" ? 126 : 66, justifyContent: "center",
                        paddingLeft: 16
                    }}>
                    <Ionicons name="chevron-back" size={38} color={"#FFF"}></Ionicons>
                </Pressable>}

                {isTrending && <Pressable
                    onPress={() => logOut()}
                    style={{ width: home ? 56 : 56, height: 66, alignSelf: "flex-end", justifyContent: "center" }}>
                    <AntDesign name="logout" size={26} color={"#FFF"}></AntDesign>
                </Pressable>}
                {!isTrending && <Pressable
                    onPress={() => {}}
                    style={{ width: home ? 56 : 56, height: 66, alignSelf: "flex-end", justifyContent: "center" }}>
                    <Ionicons name="cart" size={26} color={"#FFF"}></Ionicons>
                </Pressable>}

            </View>}


            {(issearch == true) && <View style={{ flex: 1, flexDirection: "row" }}>
                <Pressable
                    onPress={() => props.navigation.pop()}
                    style={{
                        width: 46, height: Platform.OS == "ios" ? 126 : 66, justifyContent: "center",
                        paddingLeft: 6
                    }}>
                    <Ionicons name="chevron-back" size={38} color={"#FFF"}></Ionicons>
                </Pressable>
                <TextInput
                    style={{
                        height: 48, width: "82%", backgroundColor: "#FFF", bottom: 5, position: "absolute",
                        left: 50, paddingLeft: 20, borderRadius: 10, fontFamily: "Montserrat-Regular"
                    }}
                    placeholder={"Searching ...."}
                    value={value}
                    onChangeText={onChange}
                ></TextInput>
            </View>}
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);