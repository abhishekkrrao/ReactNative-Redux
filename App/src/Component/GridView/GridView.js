import React, { useEffect } from 'react';
import {
    View, Pressable, Dimensions, Image,
    Text
} from 'react-native';

const GridView = ({ item, index, props, removeItem = () => null, addItem = () => null }) => {
    
    useEffect(()=>{
    },[])
    
    return (
        <View
            key={(index + 919)}
            style={[{
                width: ((Dimensions.get("screen").width / 2) - 20), height: "auto",
                backgroundColor: "#FFF",
                marginBottom: 5, marginTop: 10, marginLeft: (index % 2 == 0) ? 5 : 10,
                flexDirection: "column", borderRadius: 16
            }, { elevation: 1 }]}>
            <View style={{
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
            <View style={{ width: "100%", flexDirection: "column", padding: 10 }}>
                <Text style={{ color: "#111", fontSize: 16, fontFamily: "Montserrat-Medium" }}>{item?.name}</Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#111", fontSize: 14, flex: 1, paddingTop: 5, fontFamily: "Montserrat-Bold" }}>{"$" + item?.price}</Text>
                    <Text style={{ color: "#ffab00", fontSize: 11, flex: 1, paddingTop: 5, fontFamily: "Montserrat-Bold" }}>{"Cart " + (item?.count ? item?.count : 0)}</Text>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        {(item?.count > 0) && <Text
                            onPress={() => removeItem(item)}
                            style={{ color: "#111", fontSize: 28, fontFamily: "Montserrat-Bold", paddingEnd: 20 }}>{"-"}</Text>}
                        <Text
                            onPress={() => addItem(item)}
                            style={{ color: "#111", fontSize: 28, fontFamily: "Montserrat-Bold", fontWeight: "bold" }}>{"+"}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export { GridView };