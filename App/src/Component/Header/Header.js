import { View, Pressable, Text, Platform } from 'react-native';
import React, { useEffect } from "react";
import { LocalStorage, mapStateToProps, mapDispatchToProps } from '../../../Util';
import { connect } from 'react-redux';

function Header({ navigation, style, home }) {
    useEffect(() => {
    }, []);

    const logOut = () => {
        LocalStorage.localStorageInstance.clearAll()
            .then(() => {
                const value = { islogin: false };
                navigation?.signIn(value);
                navigation?.setLoggedIn(false);
            });
    }
    return (
        <View style={[{
            width: "100%", height: Platform.OS == "ios" ? 96 : 55, backgroundColor: "#CCC", flexDirection: "row",
            marginTop: Platform.OS == "ios" ? -50 : 0
        }, style]}>

            <View style={{ flex: 1, padding: 20, flexDirection: "row" }}>
                {!home && <Pressable
                    style={{ flex: 1, alignSelf: "flex-start" }}
                    onPress={() => navigation.navigation.pop()}>
                    <Text style={{ fontSize: 16, paddingTop: 40 }}>{"Back"}</Text>
                </Pressable>}


                <Pressable
                    style={{ flex: 1, alignSelf: "flex-end", alignItems: "flex-end" }}
                    onPress={() => logOut()}>
                    <Text style={{ fontSize: 21, color: "red", fontWeight: "900" }}>{"Logout"}</Text>
                </Pressable>

            </View>
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);