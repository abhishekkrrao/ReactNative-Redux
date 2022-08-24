import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, StatusBar, Image, Pressable,
    Text
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons";

function ProfilePage(props) {


    const [item, setItem] = useState({});
    useEffect(() => {
        setItem(props.route.params);
    }, []);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

        <View style={{ width: "100%", flexDirection: "row", padding: 16 }}>
            <Pressable
                onPress={() => { props.navigation.navigate("Home") }}
                style={[{
                    width: 55, height: 55, backgroundColor: "#40241a",
                    borderRadius: 56
                }, { justifyContent: "center", zIndex: 1, alignItems: "center" }]}>
                <MaterialCommunityIcons name="keyboard-backspace" color={"#FFF"} size={28} />
            </Pressable>
            <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: "Montserrat-Bold", flex: 1 }}>{"Your Profile"}</Text>
            </View>
        </View>


        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 20 }}>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{
                    color: "#000", fontFamily: "Montserrat-Medium",
                    fontSize: 16, letterSpacing: 0, lineHeight: 20
                }}>{"Abhishek Kumar Rao"}</Text>
                <Text style={{
                    color: "#000", fontFamily: "Montserrat-Regular", lineHeight: 12, fontSize: 11,
                    textAlign: "left"
                }}>{"Balraj Khanna Marg, Patel Nagar, New Delhi, Delhi 110008"}</Text>
                <Pressable
                    style={{
                        width: 126, height: 'auto', backgroundColor: "#FFF",
                        justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#CCC", marginTop: 5
                    }}>
                    <Text style={{
                        color: "#000", fontFamily: "Montserrat-Regular", fontSize: 10,
                        padding: 10
                    }}>{"Edit Your Profile"}</Text>
                </Pressable>
            </View>


            <View style={{ flex: 1, alignItems: "center" }}>
                {/* <Image
                    source={{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }}
                    style={{ width: 76, height: 76, borderRadius: 96,backgroundColor:"#CCC" }}></Image> */}
                <Ionicons name="person-circle-sharp" size={96} color="#40241a" />
                <View style={{ position: "absolute", bottom: 12, right: 30 }}>
                    <MaterialCommunityIcons name="plus" color={"#FFF"} size={44} />
                </View>
            </View>
        </View>

        <View style={{ flex: 1 }}>




            <Pressable style={{ position: "absolute", bottom: 20, left: "44%" }}>
                <Text style={{ fontSize: 17, fontFamily: "Montserrat-Medium" }}>{"Logout"}</Text>
            </Pressable>

        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)