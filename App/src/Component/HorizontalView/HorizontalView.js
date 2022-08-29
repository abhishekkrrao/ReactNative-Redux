import React from "react";
import { appColor, fontStyle, appDimension } from "../../../Styles";
import { View, Text, Image, Pressable } from "react-native";

const HorizontalView = ({ item, index }) => {
    return (
        <View
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
                </View>
            </View>
        </View>
    );
}
export { HorizontalView };