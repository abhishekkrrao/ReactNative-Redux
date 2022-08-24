import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView, View, Dimensions, Pressable,
    Text, TouchableOpacity, ScrollView, Image, Platform
} from "react-native";
import { connect } from "react-redux";
import { CommonStyle } from '../../../../Styles';
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
import { CustomButton } from '../../../CustomModules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Carousel } from 'react-native-snap-carousel-v4';


const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 100;

function DetailPage(props) {

    const [item, setItem] = useState({});
    const [entries, setEntries] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const _carousel = useRef(null);
    const [slides, setSlides] = useState([{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }]);
    useEffect(() => {
        setItem(props.route.params);
    }, []);



    const _renderItem = ({ item, index }) => {
        return (
            <View
                key={(parseInt(index))}
                style={{ width: "100%" }}>
                <Image
                    key={(parseInt(index))}
                    source={{ uri: slides[0].uri }}
                    style={{
                        width: "100%", height: 300
                    }}>
                </Image>
            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9", marginTop: -46 }}>
            <ScrollView
                style={{ flex: 1 }}>

                <Pressable
                    onPress={() => { props.navigation.pop() }}
                    style={[{
                        width: 56, height: 56, backgroundColor: "#40241a",
                        borderRadius: 56, position: "absolute", top: Platform.OS == "android" ? 60 : 40, left: 16
                    }, { justifyContent: "center", alignItems: "center", zIndex: 1 }]}>
                    <MaterialCommunityIcons name="keyboard-backspace" color={"#FFF"} size={28} />
                </Pressable>

                <View style={{ width: "100%", height: "auto", flexDirection: "column" }}>
                    <Carousel
                        ref={(c) => {
                            _carousel.current = c;
                            // console.log(_carousel?.current?._activeItem);
                        }}
                        data={[1, 2, 3, 4, 5, 6, 7, 8]}
                        renderItem={_renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={sliderWidth * 0.99}
                        autoplay={true}
                        autoplayDelay={1000}
                    />


                    <View style={{
                        width: "100%", flexDirection: 'row', flexWrap: "wrap",
                        marginTop: -56,
                        justifyContent: "center", alignItems: "center"
                    }}>
                        {entries.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        width: 22, height: 5,
                                        backgroundColor: (_carousel?.current?._activeItem == index) ? "#FFF" : "#40241a",
                                        borderRadius: 39,
                                        zIndex: 1, marginLeft: 3
                                    }} />
                            )
                        })}
                    </View>

                </View>

                <View style={[{
                    flex: 1, backgroundColor: "#FFF", borderTopEndRadius: 26,
                    borderTopLeftRadius: 26, marginTop: 30,
                    padding: 10, height: 900
                }]}>



                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                        <Text
                            style={{
                                padding: 5, fontSize: 23,
                                fontFamily: "Montserrat-Bold", flex: 3, textTransform: "capitalize", color: "#373737"
                            }}>{"classic decor india Hanging Polyester Jewellery Organizer,Black"}</Text>
                        <Text
                            style={{
                                flex: 1, padding: 5, fontSize: 23, fontFamily: "Montserrat-Bold",
                                color: "#40241A"
                            }}>{"₹499"}</Text>
                    </View>

                    <Text style={{
                        padding: 5, fontSize: 12, fontFamily: "Montserrat-Regular",
                        lineHeight: 24, marginTop: 20
                    }}>{`5pcs/lot 30mm Key Ring Long 70mm Popular Classic 8 Colors Plated Lobster Clasp Key Hook Chain Jewelry Making for Keychain Package Include As Title 30mm Key Ring Long 70mm Popular `}</Text>



                    <Text style={{ padding: 5, fontSize: 18, fontFamily: "Montserrat-Bold", marginTop: 20 }}>{"Available Color - Black, Green"}</Text>
                    <Text style={{ padding: 5, fontSize: 14, fontFamily: "Montserrat-Regular", marginTop: 16 }}>{"FREE delivery Friday, August 26 if you spend ₹499 on items shipped by Amazon."}</Text>






                </View>
            </ScrollView>

            <View
                style={{ position: "absolute", bottom: 40, left: 0, width: "100%" }}>

                <View style={{ width: "100%", flexDirection: "row" }}>

                    <View style={{ flex: 1, padding: 5 }}>
                        <CustomButton
                            btnStyle={{ backgroundColor: "#40241a", height: 45, width: "100%", alignSelf: "center" }}
                            textStyle={{ fontSize: 13, fontFamily: "Montserrat-Bold" }}
                            value='Add to cart'></CustomButton>
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                        <CustomButton
                            btnStyle={{ backgroundColor: "#40241a", height: 45, width: "100%", alignSelf: "center" }}
                            textStyle={{ fontSize: 13, fontFamily: "Montserrat-Bold" }}
                            value='Buy Now'></CustomButton>
                    </View>
                </View>

            </View>
        </SafeAreaView >);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)