import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, StatusBar, Image, Pressable,
    Text
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function ProfilePage(props) {


    const [item, setItem] = useState({});
    useEffect(() => {
        setItem(props.route.params);
    }, []);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 20 }}>
            <View style={{ flex: .6, alignItems: "flex-start" }}>
                <Pressable
                    onPress={() => { props.navigation.navigate("Home") }}
                    style={[{
                        width: 56, height: 56, backgroundColor: "#40241a",
                        borderRadius: 56
                    }, { justifyContent: "center", alignItems: "center", zIndex: 1 }]}>
                    <MaterialCommunityIcons name="keyboard-backspace" color={"#FFF"} size={36} />
                </Pressable>
            </View>




            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#000", fontFamily: "Montserrat-Medium",
            fontSize:16,letterSpacing:0,lineHeight:20 }}>{"Abhishek Kumar Rao"}</Text>
                <Text style={{ color: "#000", fontFamily: "Montserrat-Regular", padding: 3,lineHeight:12,fontSize:11,
            textAlign:"center" }}>{"Balraj Khanna Marg, Patel Nagar, New Delhi, Delhi 110008"}</Text>
                <Pressable
                    style={{
                        width: 126, height: 'auto', backgroundColor: "#FFF",
                        justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#CCC", padding: 5
                    }}>
                    <Text style={{ color: "#000", fontFamily: "Montserrat-Regular", fontSize: 10 }}>{"Edit Your Profile"}</Text>
                </Pressable>
            </View>


            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }}
                    style={{ width: 76, height: 76, borderRadius: 96 }}></Image>
            </View>
        </View>

        <View style={{ flex: 1 }}>


            <Text style={{
                color: "#000", fontFamily: "Montserrat-Bold",
                paddingLeft: 30
            }}>{"Recent Activity"}</Text>




        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)