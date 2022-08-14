import { Text, View, Image, Pressable } from "react-native";
import React, { memo } from "react";
import { LocalStorage, mapStateToProps, mapDispatchToProps } from '../../../Util';
import { connect } from 'react-redux';


function ListItem({ cStyle, items, props, iStyle, tStyle }) {
    function getRandomInt() {
        return Math.floor(Math.random() * 100) + 1;
    }
    const logOut = (props) => {
        LocalStorage.localStorageInstance.clearAll()
            .then(() => {
                const value = { islogin: false };
                props.signIn(value);
                props.setLoggedIn(false);
            });
    }

    const _navigate = (props) => { props.navigation.navigate("SceenA"); }
    return (
        <View
            key={(items?.id + getRandomInt()).toString()}
            style={cStyle}>
            <Pressable
                onPress={() => { _navigate(props)}}
                style={{ flex: 1 }}>
                <Image
                    style={iStyle}
                    resizeMode="contain"
                    source={{ uri: items?.thumb }}
                />
                <Text
                    numberOfLines={1}
                    style={tStyle}>{items.meta_title}</Text>
            </Pressable>
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);