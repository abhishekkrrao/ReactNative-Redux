import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView, View, Dimensions, Pressable,
    Text, TouchableOpacity, ScrollView, Image
} from "react-native";
import { connect } from "react-redux";
import { CommonStyle } from '../../../../Styles';
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
import { CustomButton } from '../../../CustomModules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



function DetailPage(props) {

    const [item, setItem] = useState({});
    const [slides, setSlides] = useState([{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }]);
    useEffect(() => {
        setItem(props.route.params);
    }, []);






    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
            <ScrollView
                nestedScrollEnabled={true}
                style={{ flex: 1, position: "relative" }}>

                <Pressable
                    onPress={() => { props.navigation.pop() }}
                    style={[{
                        width: 56, height: 56, backgroundColor: "#40241a",
                        borderRadius: 56, position: "absolute", top: 16, left: 16
                    }, { justifyContent: "center", alignItems: "center", zIndex: 1 }]}>
                    <MaterialCommunityIcons name="keyboard-backspace" color={"#FFF"} size={36} />
                </Pressable>

                <View style={{ width: "100%" }}>
                    <Image
                        source={{ uri: slides[0].uri }}
                        style={{
                            width: "100%", height: 300
                        }}>
                    </Image>
                </View>

                <View style={[{
                    flex: 1, backgroundColor: "#FFF", borderTopEndRadius: 36, borderTopLeftRadius: 36, marginTop: -36,
                    padding: 10, height: 900
                }]}>
                    <Text style={{ padding: 5, fontSize: 19, fontFamily: "Montserrat-Bold" }}>{"Amazing Food Place"}</Text>
                    <Text style={{
                        padding: 5, fontSize: 14, fontFamily: "Montserrat-Regular",
                        lineHeight: 17
                    }}>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus, gravida vel ex volutpat, posuere euismod tortor. Pellentesque tincidunt, mi ac varius blandit, quam orci dignissim risus, vitae rutrum orci urna ut neque.
        Pellentesque condimentum ut libero id blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`}</Text>


                    <Text style={{ padding: 5, fontSize: 14, fontFamily: "Montserrat-Bold" }}>{"₹499"}</Text>
                    <Text style={{ padding: 5, fontSize: 14, fontFamily: "Montserrat-Regular", color: "#40241a" }}>{"Black"}</Text>
                    <Text style={{ padding: 5, fontSize: 14, fontFamily: "Montserrat-Regular" }}>{"FREE delivery Friday, August 26 if you spend ₹499 on items shipped by Amazon."}</Text>


                    {/* <View style={{ width: "100%", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <Text
                            onPress={() => { }}
                            style={{ color: "#111", fontSize: 28, fontFamily: "Montserrat-Bold", paddingEnd: 20 }}>{"-"}</Text>
                        <Text
                            onPress={() => { }}
                            style={{ color: "#111", fontSize: 28, fontFamily: "Montserrat-Bold", fontWeight: "bold", paddingEnd: 20 }}>{"2"}</Text>
                        <Text
                            onPress={() => { }}
                            style={{ color: "#111", fontSize: 28, fontFamily: "Montserrat-Bold", fontWeight: "bold" }}>{"+"}</Text>
                    </View> */}



                    {/* <View
                        style={{ width: "100%", flexDirection: "row", padding: 20 }}>

                        <CustomButton
                            textStyle={{ fontFamily: "Montserrat-Medium" }}
                            value={"  Add To Cart   "}
                            onPress={() => { console.log("olacab") }}
                            btnStyle={{ backgroundColor: "#40241a" }}>

                        </CustomButton>


                        <CustomButton
                            textStyle={{ fontFamily: "Montserrat-Medium" }}
                            value={"   Buy Now       "}
                            onPress={() => { console.log("olacab") }}
                            btnStyle={{ backgroundColor: "#40241a", marginLeft: 5 }}>

                        </CustomButton>
                    </View> */}
                </View>
                {/* <BottomSheet ref={ref}>
<View style={{ flex: 1, backgroundColor: '#FFF',marginBottom:-200 }}>
<Pressable
    style={{ flex: 1, padding: 20 }}
    onPress={() => { }}>
    <Text
        onPress={() => { ref?.current?.scrollTo(0); }}
        style={{ fontSize: 21, color: "#000" }}>{"Click to close"}</Text>
</Pressable>
</View>
</BottomSheet> */}

            </ScrollView>
        </SafeAreaView >);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)