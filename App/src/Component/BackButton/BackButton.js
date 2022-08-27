import React from "react";
import { Pressable, View, Text } from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BackButton = ({screenTitle = "", onClick = () => null}) => {

    return (
        <View style={{ width: "100%", flexDirection: "row" }}>
            <Pressable
                onPress={onClick}
                style={[{
                    width: 55, height: 55, backgroundColor: "#FFF",
                    borderRadius: 56
                }, { justifyContent: "center", zIndex: 1, alignItems: "center" }]}>
                <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={28} />
            </Pressable>
            {screenTitle && <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: "Montserrat-Bold", flex: 1 }}>{screenTitle}</Text>
            </View>}
        </View>
    )
}
export { BackButton };