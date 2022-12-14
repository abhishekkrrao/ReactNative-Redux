import { Text, View, Image, Pressable, Platform } from "react-native";
import React from "react";
import { mapStateToProps, mapDispatchToProps } from '../../../Util';
import { connect } from 'react-redux';
import { appColor } from '../../../Styles';
const shadowAndroidStyle = {
    overflow: "hidden", elevation: 4
}
const shadowIOSStyle = {
    shadowColor: appColor.black, shadowOffset: { height: 1.5, width: 0 },
    shadowOpacity: 0.15, overflow: "hidden", borderWidth: 1, borderColor: appColor.white
}

function ListItem({ cStyle, items, props, iStyle, tStyle, screen,key }) {
    function getRandomInt() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const _navigate = (props) => { props.navigation.navigate(screen); }
    return (
        <View
            key={key}
            style={[cStyle, Platform.OS == "android" ? shadowAndroidStyle : shadowIOSStyle]}>
            <View style={{
                width: "100%", height: "auto",
                padding: Platform.OS == "android" ? 10 : 0
            }}>
                <Pressable
                    onPress={() => { _navigate(props) }}
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={[iStyle, { elevation: 0 }]}
                        resizeMode="contain"
                        source={{ uri: items?.thumb }}
                    />
                    <Text
                        numberOfLines={1}
                        style={[tStyle, { textTransform: "capitalize", alignSelf: "flex-start", fontWeight: "600", fontSize: 13 }]}>{items.meta_title}</Text>

                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Text
                            numberOfLines={1}
                            style={[tStyle, { textTransform: "capitalize", alignSelf: "flex-start", flex: 1, color: "red", fontWeight: "500", fontSize: 11 }]}>{"Price $25"}</Text>
                        <Text
                            numberOfLines={1}
                            style={[tStyle, { textTransform: "capitalize", alignSelf: "flex-end", flex: 1, color: "green", fontSize: 11 }]}>{"Available"}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);