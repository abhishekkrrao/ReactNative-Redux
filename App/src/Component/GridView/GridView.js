import React, { useEffect } from 'react';
import {
    View, Pressable, Dimensions, Image,
    Text
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontStyle,appColor } from '../../../Styles';

const GridView = ({ item, index, props, removeItem = () => null, addItem = () => null, likeItem = () => null }) => {

    useEffect(() => {
        console.log(((parseInt(index) + (919 * 34)) + "").toString())
    }, [])

    return (
        <View
            // key={((parseInt(index) + (919 * 34)) + "").toString()}
            style={[{
                width: ((Dimensions.get("screen").width / 2) - 20), height: "auto",
                backgroundColor: appColor.white,
                marginBottom: 5, marginTop: 10, marginLeft: (index % 2 == 0) ? 5 : 10,
                flexDirection: "column", borderRadius: 16
            }, { elevation: 1 }]}>
            <View
                style={{
                    width: "100%", height: 120, backgroundColor: "#eeeeee",
                    justifyContent: "center", alignItems: "center", borderTopEndRadius: 16,
                    borderTopLeftRadius: 16
                }}>
                <Pressable

                    onPress={() => {
                        console.log(props)
                        props.navigation.navigate("DetailPage", item);
                    }}>
                    <Image
                        source={{ uri: item?.thumb }}
                        style={{ width: 96, height: 96, borderRadius: 6 }}></Image>
                </Pressable>
            </View>
            <View
                style={{ width: "100%", flexDirection: "column", padding: 10 }}>

                <View style={{ width: "100%", flexDirection: "row" }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            color: "#111", fontSize: 14,
                            fontFamily: fontStyle.medium, flex: 1, textAlign: "left"
                        }}>{item?.name}</Text>

                    <Pressable
                        onPress={() => {
                            likeItem(item)
                        }}
                        style={{ width:26, alignItems: "center",marginLeft:1 }}>
                        {item?.like ? <MaterialCommunityIcons color={appColor.black} name="heart-circle" size={24}></MaterialCommunityIcons> : <MaterialCommunityIcons name="heart-circle-outline" color={appColor.darkGrey} size={24}></MaterialCommunityIcons>}
                    </Pressable>
                </View>

                <View
                    style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text
                        style={{ color: "#111", fontSize: 14, flex: 1, paddingTop: 5, fontFamily: fontStyle.bold }}>{"$" + item?.price}</Text>
                    <Text
                        style={{ color: "#ffab00", fontSize: 11, flex: 1, paddingTop: 5, fontFamily: fontStyle.bold }}>{"Cart " + (item?.count ? item?.count : 0)}</Text>
                    <View
                        style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        {(item?.count > 0) && <Text
                            onPress={() => removeItem(item)}
                            style={{ color: "#111", fontSize: 28, fontFamily: fontStyle.bold, paddingEnd: 20 }}>{"-"}</Text>}
                        <Text
                            onPress={() => addItem(item)}
                            style={{ color: "#111", fontSize: 28, fontFamily: fontStyle.bold, fontWeight: "bold" }}>{"+"}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export { GridView };