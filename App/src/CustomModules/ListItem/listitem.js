import { Text, View, Image, Pressable, Platform } from "react-native";
import React from "react";
import { mapStateToProps, mapDispatchToProps } from '../../../Util';
import { connect } from 'react-redux';

const shadowAndroidStyle = {
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: .20, shadowRadius: 6,
    overflow: "hidden", elevation: 6
}
const shadowIOSStyle = {
    shadowColor: "#000", shadowOffset: { height: 1.5, width: 0 },
    shadowOpacity: 0.15, overflow: "hidden", borderWidth: 1, borderColor: "#FFF"
}

function ListItem({ cStyle, items, props, iStyle, tStyle, screen }) {
    function getRandomInt() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const _navigate = (props) => { props.navigation.navigate(screen); }
    return (
        <View
            key={(items?.id + getRandomInt()).toString()}
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