import React from "react";
import { Pressable, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NoRecordPage = ({ screenTitle = "", onClick = () => null }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Ionicons color={"#424242"} name={"heart-outline"} size={96}></Ionicons>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 21, color: "#424242" }}>{screenTitle}</Text>
        </View>
    )
}
export { NoRecordPage };