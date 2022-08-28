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
import { ScrollView } from "react-native-gesture-handler";
import { LocalStorage } from "../../../../Util";
import { BackButton } from "../../../Component";
import { appColor } from "../../../../Styles";


function ProfilePage(props) {


    const logOut = () => {
        try {
            LocalStorage.localStorageInstance.clearAll()
                .then(() => {
                    try {
                        const value = { islogin: false };
                        props.signIn(value);
                        props.setLoggedIn(false);
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const [item, setItem] = useState({});
    useEffect(() => {
        setItem(props.route.params);
    }, []);

    const onClick = () => { props.navigation.navigate("Home") }
    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

        <View style={{ width: "100%", flexDirection: "row", padding: 16 }}>

            <BackButton onClick={() => onClick()} screenTitle={"Your Profile"} props={props} ></BackButton>

        </View>


        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 20 }}>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{
                    color: appColor.black, fontFamily: "Montserrat-Medium",
                    fontSize: 16, letterSpacing: 0, lineHeight: 20
                }}>{"Abhishek Kumar Rao"}</Text>
                <Text style={{
                    color: appColor.black, fontFamily: "Montserrat-Regular", lineHeight: 12, fontSize: 11,
                    textAlign: "left"
                }}>{"Balraj Khanna Marg, Patel Nagar, New Delhi, Delhi 110008"}</Text>
                <Pressable
                    onPress={() => props.navigation.navigate("EditProfilePage")}
                    style={{
                        width: 126, height: 'auto', backgroundColor: appColor.white,
                        justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#CCC", marginTop: 5
                    }}>
                    <Text style={{
                        color: appColor.black, fontFamily: "Montserrat-Medium", fontSize: 12,
                        padding: 10
                    }}>{"Edit Your Profile"}</Text>
                </Pressable>
            </View>


            <View style={{ flex: 1, alignItems: "center" }}>
                {/* <Image
                    source={{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }}
                    style={{ width: 76, height: 76, borderRadius: 96,backgroundColor:"#CCC" }}></Image> */}
                <Ionicons name="person-circle-sharp" size={96} color="#CCC" />
                <View style={{ position: "absolute", bottom: 12, right: 30 }}>
                    <MaterialCommunityIcons name="plus" color={appColor.white} size={44} />
                </View>
            </View>
        </View>

        <ScrollView style={{ flex: 1, paddingTop: 20 }}>


            <View style={{
                width: "90%", backgroundColor: appColor.white, alignSelf: "center", padding: 20, borderRadius: 26,
                flexDirection: "row", justifyContent: "center"
            }}>
                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 19, flex: 1 }}>{"Referrals"}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons name="arrow-forward-sharp" color={appColor.black} size={28} />
                </View>
            </View>
            <View style={{
                width: "90%", backgroundColor: appColor.white, marginTop: 20, alignSelf: "center", padding: 20, borderRadius: 26,
                flexDirection: "row", justifyContent: "center"
            }}>
                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 19, flex: 1 }}>{"Your Order"}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons name="arrow-forward-sharp" color={appColor.black} size={28} />
                </View>
            </View>


            <View style={{
                width: "90%", backgroundColor: appColor.white, marginTop: 20, alignSelf: "center", padding: 20, borderRadius: 26,
                flexDirection: "row", justifyContent: "center"
            }}>
                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 19, flex: 2 }}>{"Privacy & Policy"}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons name="arrow-forward-sharp" color={appColor.black} size={28} />
                </View>
            </View>


            <View style={{
                width: "90%", backgroundColor: appColor.white, marginTop: 20, alignSelf: "center", padding: 20, borderRadius: 26,
                flexDirection: "row", justifyContent: "center"
            }}>
                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 19, flex: 2 }}>{"Contact Support"}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons name="arrow-forward-sharp" color={appColor.black} size={28} />
                </View>
            </View>
            <View style={{
                width: "90%", backgroundColor: appColor.white, marginTop: 20, alignSelf: "center", padding: 20, borderRadius: 26,
                flexDirection: "row", justifyContent: "center"
            }}>
                <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 19, flex: 1 }}>{"Address"}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Ionicons name="arrow-forward-sharp" color={appColor.black} size={28} />
                </View>
            </View>


            <Pressable
                onPress={() => logOut()}
                style={{
                    width: "100%", padding: 25, alignItems: "center",
                    marginBottom: 50
                }}>
                <Text style={{ fontSize: 19, fontFamily: "Montserrat-Bold" }}>{"Logout"}</Text>
            </Pressable>

        </ScrollView>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)