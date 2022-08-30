import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView, View, Dimensions, Pressable,
    Text, TouchableOpacity, ScrollView, Image, Platform, StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { CommonStyle, appColor } from '../../../../Styles';
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Footer, Header } from "../../../Component";
import { CustomButton } from '../../../CustomModules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Carousel } from 'react-native-snap-carousel-v4';
import { BackButton } from '../../../Component';



const sliderWidth = Dimensions.get("window").width;


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
                        width: "90%", height: 200, borderRadius: 26
                    }}>
                </Image>
            </View>
        );
    }

    const onClick = () => { props.navigation.pop(); }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround, marginTop: -46 }}>
            <ScrollView
                nestedScrollEnabled={true}
                style={{ flex: 1 }}>

                <View style={{
                    width: "100%", flexDirection: "row",
                    marginTop: Platform.OS == "ios" ? 40 : 66, marginLeft: 20
                }}>
                    <View style={{ flex: 2 }}>
                        <BackButton onClick={() => onClick()} screenTitle={"Detail"} props={props} ></BackButton>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 40 }}>
                        <Pressable
                            onPress={() => { }}
                            style={[{
                                width: 56, height: 56, borderRadius: 56, backgroundColor: appColor.white
                            }, { justifyContent: "center", alignItems: "center", zIndex: 1 }]}>
                            <Ionicons name="notifications" color={appColor.black} size={28} />
                        </Pressable>
                    </View>
                </View>


                <View style={{
                    width: "90%", height: "auto", flexDirection: "column",
                    marginTop: 20, alignSelf: "center"
                }}>
                    <Carousel
                        ref={(c) => {
                            _carousel.current = c;
                            // console.log(_carousel?.current?._activeItem);
                        }}
                        data={[1, 2, 3, 4, 5, 6, 7, 8]}
                        renderItem={_renderItem}
                        sliderWidth={sliderWidth / 1.1}
                        itemWidth={sliderWidth * 1}
                        autoplay={true}
                        autoplayDelay={1000}
                    />


                    <View style={{
                        width: "100%", flexDirection: 'row', flexWrap: "wrap",
                        marginTop: 20,
                        justifyContent: "center", alignItems: "center"
                    }}>
                        {entries.map((item, index) => {
                            return (
                                <View
                                    key={(parseInt(index))}
                                    style={{
                                        width: 22, height: 5,
                                        backgroundColor: (_carousel?.current?._activeItem == index) ? appColor.white : appColor.black,
                                        borderRadius: 39,
                                        zIndex: 1, marginLeft: 3
                                    }} />
                            )
                        })}
                    </View>

                </View>

                <View style={[{
                    flex: 1, backgroundColor: appColor.white, borderTopEndRadius: 26,
                    borderTopLeftRadius: 26, marginTop: 20,
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
                                color: appColor.black
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

            <View style={[styles.bottom]}>
                <Footer
                    onClickCart={() => {
                        console.log("Cart Click...")
                    }}
                    onClickBuy={() => {
                        console.log("Buy Click...")
                    }}
                    isDetail={true}>
                </Footer>
            </View>
        </SafeAreaView >);
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);

const styles = StyleSheet.create({
    bottom: { position: "absolute", bottom: 0, left: 0, width: "100%", padding: 10, backgroundColor: "#FFF" }
})