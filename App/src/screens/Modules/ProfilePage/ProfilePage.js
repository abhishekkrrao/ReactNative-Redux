import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, StatusBar, Image, Pressable,
    Text
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
function ProfilePage(props) {


    const [item, setItem] = useState({});
    useEffect(() => {
        setItem(props.route.params);
        console.log(item)
    }, []);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
        <StatusBar hidden={false} />
        <View style={{ flex: 1 }}>

            <View style={{ width: "100%", height: 120, backgroundColor: "#CCC" }}>
                <Image
                    source={{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }}
                    style={{
                        width: 96, height: 96, borderRadius: 96,
                        position: "absolute", bottom: -40, left: 20
                    }}></Image>
            </View>

            <View style={{
                width: "100%", padding: 10, alignItems: "center"
            }}>

                <Text style={{
                    color: "#000", fontFamily: "Montserrat-Bold",
                    paddingLeft: 30
                }}>{"Abhishek Kumar Rao"}</Text>
                <Text style={{
                    color: "#000", fontFamily: "Montserrat-Regular",
                    paddingLeft: 5
                }}>{"Gurgaon,Haryana"}</Text>
                <Pressable
                    style={{
                        width: 156, height: 36, backgroundColor: "#FFF",
                        justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#CCC", padding: 10,
                        marginLeft: 30, marginTop: 5
                    }}>
                    <Text style={{ color: "#000", fontFamily: "Montserrat-Regular" }}>{"Edit Your Profile"}</Text>
                </Pressable>
            </View>

            <Text style={{
                    color: "#000", fontFamily: "Montserrat-Bold",
                    paddingLeft: 30
                }}>{"Recent Activity"}</Text>



        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)