import { View, Pressable, Text, Platform } from 'react-native';
import React, { useEffect } from "react";
import { LocalStorage, mapStateToProps, mapDispatchToProps } from '../../../Util';
import { connect } from 'react-redux';

function Header({ props, style, home, issearch }) {
    useEffect(() => {
    }, []);

    const logOut = () => {
        LocalStorage.localStorageInstance.clearAll()
            .then(() => {
                const value = { islogin: false };
                props?.signIn(value);
                props?.setLoggedIn(false);
            });
    }
    return (
        <View style={[{ width: "100%", backgroundColor: "#e64a19", height: Platform.OS == "ios" ? 96 : 70, marginTop: Platform.OS == "ios" ? -50 : 0 }]}>

            {!issearch && <View style={{ flex: 1, flexDirection: "row" }}>
                {!home && <View
                    style={{ width: 200, height: Platform.OS == "ios" ? 126 : 66, justifyContent: "center" }}>
                    <Text
                        onPress={() => props.navigation.pop()}
                        style={{ fontSize: 21, padding: 16, fontWeight: "bold", color: "#FFF" }}>{"Back"}</Text>
                </View>}


                <View
                    style={{ width: home ? "100%" : 200, height: 66, alignSelf: "flex-end", justifyContent: "center" }}>
                    <Text
                        onPress={() => logOut()}
                        style={{ fontSize: 21, padding: 16, textAlign: "right", fontWeight: "bold", color: "#FFF" }}>{"Logout"}</Text>
                </View>

            </View>}
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);