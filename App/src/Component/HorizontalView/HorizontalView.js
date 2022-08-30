import React, { useRef, useEffect } from "react";
import { appColor, fontStyle, appDimension } from "../../../Styles";
import { View, Text, Image, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut, Layout, RotateInDownLeft, ZoomIn, ZoomOut } from 'react-native-reanimated';


const HorizontalView = ({ item, index, onDelete = () => null }) => {
    const initialMode = useRef(true);
    useEffect(() => {
        initialMode.current = false;
    }, []);
    return (
        <Animated.View
            entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
            layout={Layout.delay(100)}
            exiting={FadeOut}
            key={(index * 245 + 87)}
            style={{
                width: "95%", padding: 10, backgroundColor: "#f5f5f5",
                marginBottom: 5, alignSelf: "center", marginTop: 10, borderRadius: 5
            }}>
            <View style={{
                flex: 1, flexDirection: "row", justifyContent: "flex-start",
                alignItems: "center"
            }}>
                <Pressable style={{
                    width: "auto", padding: 10, backgroundColor: "#FFF",
                    borderRadius: 6
                }}>
                    <Image
                        style={{ width: 96, height: 96, borderRadius: 26 }}
                        source={{ uri: item?.image_url }}></Image>
                </Pressable>
                <View style={{ flex: 1, paddingLeft: 10, justifyContent: "flex-start" }}>
                    <Text style={{
                        fontSize: appDimension.pixel16,
                        fontFamily: fontStyle.medium
                    }}>{"Mangalsutra"}</Text>
                    <Text style={{
                        fontSize: appDimension.pixel14,
                        fontFamily: fontStyle.medium, lineHeight: 26
                    }}>{item?.description}</Text>
                    <Text style={{
                        fontSize: appDimension.pixel14,
                        fontFamily: fontStyle.medium, lineHeight: 26
                    }}>{"Quantity " + item?.quantity}</Text>


                    <Text style={{
                        fontSize: appDimension.pixel16,
                        fontFamily: fontStyle.bold, color: appColor.black, lineHeight: 26
                    }}>{"$200"}</Text>

                    <View style={{ width: "100%", flexDirection: "row", alignSelf: "flex-end" }}>
                        <View style={{ flex: 3, flexDirection: "row", justifyContent: "center" }}>
                            <Text style={{ flex: 1, fontSize: appDimension.pixel21, fontFamily: fontStyle.bold }}>{"-"}</Text>
                            <Text style={{ flex: 1, fontSize: appDimension.pixel19, fontFamily: fontStyle.bold }}>{item?.quantity}</Text>
                            <Text style={{ flex: 1, fontSize: appDimension.pixel21, fontFamily: fontStyle.bold }}>{"+"}</Text>
                        </View>
                        <Pressable
                            onPress={onDelete}
                            style={{ flex: 1, alignItems: "flex-end" }}>
                            <Icon name={"delete-outline"} size={24}></Icon>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
}
export { HorizontalView };