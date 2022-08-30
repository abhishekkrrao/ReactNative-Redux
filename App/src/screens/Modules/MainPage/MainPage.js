import React, { useEffect, useState, useRef, useCallback, useMemo, useReducer } from "react";
import {
    SafeAreaView, View, Text, Image, Platform, Pressable, ScrollView,
    StyleSheet, FlatList, Dimensions,
    StatusBar,
    Alert
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { appColor, appDimension, CommonStyle, fontStyle } from "../../../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GridView, MyLoader } from "../../../Component";
import { Carousel } from 'react-native-snap-carousel-v4';
import Animated, { Transition } from "react-native-reanimated";



const MaximumValue = 800;
const MaximumDuration = 100;
const sliderWidth = Dimensions.get("window").width;
function MainPage(props) {




    /**
     * initiliaze the state
     */
    const _carousel = useRef(0);
    const [slides, setSlides] = useState([{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }]);
    const [entries, setEntries] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [allData, setAllRecord] = useState([]);
    const [trendinglist, setTrending] = useState([]);
    const [recent, setRecent] = useState([]);



    /**
     * update the state
     */

    useEffect(() => {
        setState(props);
        console.log(props);
        setAllRecord(record.output.category);


        setRecent(record.output.category)
        setTrending(record.output.category[1].children)






    }, []);



    /**
     * 
     * like items
     */



    const likeItem = useCallback((item) => {
        let index = trendinglist.indexOf(item);
        const result = trendinglist.map((sObj, position) => {
            if (index == position) {
                sObj.like = !sObj.like;
            }
            return sObj;
        });
        console.log(trendinglist)
        result.length > 0 ? setTrending(result) : "";
    }, []);
    const likeItemInRecent = useCallback((item) => {
        let index = recent.indexOf(item);
        const result = recent.map((sObj, position) => {
            if (index == position) {
                sObj.like = !sObj.like
            }
            return sObj;
        });
        result.length > 0 ? setRecent(result) : "";
    }, []);


    /**
     * 
     * add item into cart
     * @param {*} item 
     */

    const addItem = useCallback((item) => {
        let index = trendinglist.indexOf(item);
        const result = trendinglist.map((sObj, position) => {
            if (index == position) {
                sObj.count ? sObj.count += 1 : sObj.count = 1;
            }
            return sObj;
        });
        result.length > 0 ? setTrending(result) : "";
    }, [])
    const addItemInRecent = useCallback((item) => {
        let index = recent.indexOf(item);
        const result = recent.map((sObj, position) => {
            if (index == position) {
                sObj.count ? sObj.count += 1 : sObj.count = 1;
            }
            return sObj;
        });
        result.length > 0 ? setRecent(result) : "";
    }, [])



    /**
     * Remove Items
     * @param {*} item 
     */

    const removeItem = (item) => {
        let index = trendinglist.indexOf(item);
        const result = trendinglist.map((sObj, position) => {
            if (sObj.count && sObj.count > 0) {
                if (index == position) {
                    sObj.count ? sObj.count -= 1 : sObj.count = 1;
                }
            } else {
                if (index == position) {
                    sObj.count = 0;
                }
            }
            return sObj;
        });
        result.length > 0 ? setTrending(result) : "";
    }
    const removeItemInRecent = (item) => {
        let index = recent.indexOf(item);
        const result = recent.map((sObj, position) => {
            if (sObj.count && sObj.count > 0) {
                if (index == position) {
                    sObj.count ? sObj.count -= 1 : sObj.count = 1;
                }
            } else {
                if (index == position) {
                    sObj.count = 0;
                }
            }
            return sObj;
        });
        result.length > 0 ? setRecent(result) : "";
    }

    const _renderItem = ({ item, index }) => {
        return (
            <Pressable
                onPress={() => { props.navigation.navigate("DetailPage", item); }}
                key={(parseInt(index))}
                style={[{ width: "100%", marginBottom: 10 }, CommonStyle.iosShadow]}>
                <Image
                    key={(parseInt(index))}
                    source={{ uri: slides[0].uri }}
                    style={[{ width: "100%", height: 150, borderRadius: 26 }]}>
                </Image>
            </Pressable>
        );
    }

    /**
     * 
     * @param {*} item 
     */

    const checkedItem = (item) => {
        props.navigation.navigate("TrendingPage", { name: "Categories" });
        // let index = allData.indexOf(item);
        // allData[index].isCheck = !allData[index].isCheck;
    }


    /**
     * 
     * Horizontal Layout
     * @param {*} items 
     * @param {*} index 
     * @returns 
     */


    const _HorizontalLayout = useCallback((items, index) => {
        return (
            <View
                key={(index + 911)}
                style={[{ width: 166, justifyContent: "center", alignItems: "center", height: "auto", marginLeft: 10 }, { marginTop: 15, marginBottom: 5 }]}>
                <Pressable
                    onPress={() => { checkedItem(items) }}
                    style={[CommonStyle.iosShadow, { backgroundColor: items?.isCheck ? appColor.black : appColor.white, borderRadius: 16, flexDirection: "row", width: "100%" }]}>
                    <View style={{
                        flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center",
                        padding: 10
                    }}>
                        <Icon name="gesture-two-double-tap" color={(items?.isCheck ? appColor.white : appColor.black)} size={24} />
                        <Text
                            numberOfLines={1}
                            style={{ padding: 5, fontSize: 11, fontFamily: fontStyle.medium, color: (items?.isCheck ? appColor.white : appColor.black) }}>{items?.short_code}</Text>
                    </View>
                    <Image
                        resizeMode={"cover"}
                        source={{ uri: items?.thumb }}
                        style={{ width: 56, height: 86, flex: 1, alignSelf: "flex-end", borderTopRightRadius: 16, borderBottomRightRadius: 16 }}></Image>
                </Pressable>
            </View>
        );
    }, [])


    /**
     * Main Layout
     */


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
            {loading && <MyLoader />}
            {!loading && <View style={{ flex: 1, padding: 10 }}>

                {/* Header */}
                <View style={{ width: "100%", flexDirection: "row", margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: fontStyle.medium }}>{"What do you want to buy today ?"}</Text>
                    </View>
                    <View style={{ flex: .8, flexDirection: "row", justifyContent: "flex-end", alignContent: "flex-end", paddingEnd: 16 }}>
                        <Pressable
                            onPress={() => { props.navigation.navigate("CartPage") }}
                            style={{ padding: 5, backgroundColor: appColor.white, borderRadius: 36, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{
                                position: "absolute", top: -10, right: 5,
                                color: appColor.black, fontFamily: "Montserrat-Bold", fontSize: 19
                            }}>{"3"}</Text>
                            <Ionicons name="cart" size={28} color={appColor.black}></Ionicons>
                        </Pressable>
                        <Pressable
                            onPress={() => { props.navigation.navigate("Notification") }}
                            style={{ padding: 5, borderRadius: 36, backgroundColor: appColor.white, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name="notifications" size={28} color={appColor.black} />
                        </Pressable>
                    </View>
                </View>

                {/* Search Menu */}
                <View style={{ width: "100%", flexDirection: "row", alignSelf: "center", margin: 5, alignItems: "center" }}>
                    <Pressable
                        onPress={() => props.navigation.navigate("SearchPage")}
                        style={{ flex: 1, flexDirection: "row", backgroundColor: appColor.white, padding: 10, borderRadius: 26, justifyContent: "center", alignItems: "center" }}>
                        <EvilIcons name="search" size={30} color="#757575" />
                        <Text
                            style={{ flex: 1, paddingLeft: 10, fontSize: 12, fontFamily: fontStyle.medium }}>
                            {"Find the favorite jewelleries here"}
                        </Text>
                    </Pressable>
                </View>


                {/* Main Page layouts */}

                <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>

                    <View style={[{ width: "100%", height: "auto", flexDirection: "column", marginTop: 10 }]}>
                        <Carousel
                            ref={(c) => { 
                                _carousel.current = c;
                             }}
                            data={[1, 2, 3, 4, 5, 6, 7, 8]}
                            renderItem={_renderItem}
                            sliderWidth={sliderWidth}
                            itemWidth={sliderWidth * .88}
                            autoplay={true}
                            autoplayDelay={1500}
                            style={[CommonStyle.iosShadow]}
                        />
                        <View style={{ width: "100%", flexDirection: 'row', flexWrap: "wrap", marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                            {entries.map((item, index) => {
                                return (
                                    <View style={[{ width: 22, height: 5, backgroundColor: (_carousel?.current?._activeItem == index) ? appColor.white : appColor.black, borderRadius: 39, zIndex: 1, marginLeft: 3 }]} />
                                );
                            })}
                        </View>
                    </View>

                    {/* Main Page Start */}
                    <Text style={{ fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 15, paddingLeft: 10 }}>{"Categories"}</Text>
                    <View style={{ width: "100%", marginBottom: 5 }}>
                        <ScrollView
                            horizontal={true}>
                            <View style={{ width: "100%", flexDirection: 'row', flexWrap: "nowrap" }}>
                                {allData.map((value, index) => {
                                    return _HorizontalLayout(value, index);
                                })}
                            </View>
                        </ScrollView>
                    </View>


                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 10, paddingLeft: 10, marginBottom: 5 }}>{"Trending jewelleries"}</Text>
                        <Text
                            onPress={() => { props.navigation.navigate("TrendingPage", { name: "Trending Categories" }) }}
                            style={{ fontSize: 15, fontFamily: "Montserrat-Bold", marginTop: 10, marginBottom: 5, textAlign: "right", flex: 1, paddingEnd: 10, color: appColor.black }}>{"Show all"}</Text>
                    </View>

                    <Animated.View
                        style={{ width: "100%", flexDirection: 'row', flexWrap: "wrap" }}>
                        {trendinglist.map((value, index) => <GridView
                            item={value}
                            props={props}
                            index={(parseInt(index) + 77)}
                            removeItem={removeItem}
                            likeItem={likeItem}
                            addItem={addItem}></GridView>)}
                    </Animated.View>


                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 10, paddingLeft: 10, marginBottom: 5 }}>{"Your Recent jewelleries"}</Text>
                        <Text
                            onPress={() => { props.navigation.navigate("TrendingPage", { name: "Recent Categories" }) }}
                            style={{ fontSize: 15, fontFamily: "Montserrat-Bold", marginTop: 10, marginBottom: 5, textAlign: "right", flex: 1, paddingEnd: 10, color: appColor.black }}>{"Show all"}</Text>
                    </View>

                    <View style={{ width: "100%", flexDirection: 'row', flexWrap: "wrap" }}>
                        {recent.map((value, index) => <GridView
                            item={value}
                            props={props}
                            index={(parseInt(index) + 99)}
                            removeItem={removeItemInRecent}
                            likeItem={likeItemInRecent}
                            addItem={addItemInRecent}></GridView>)}
                    </View>

                    <View style={{ width: "100%", height: 50 }}></View>

                </ScrollView>
            </View>}
        </SafeAreaView>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: appColor.white },
    containerChild: { flex: 1 },
    ingredientsText: {
        fontSize: 14, color: 'black', paddingTop: 5, paddingStart: 5
    },
    gridIngredients: {
        width: '47.3%', flexDirection: "column", borderRadius: 8,
        overflow: "hidden", justifyContent: "center", alignItems: "center",
        marginLeft: 8
    },
    ingredientImage: {
        width: 136, height: 136
    },
    hIngredients: {
        width: 96, overflow: "hidden", alignItems: "flex-start"
    },
    hImage: {
        width: 96, height: 96, top: 0
    },
    sContainer: {
        width: "100%"
    },
    nonSelec: {
        width: appDimension.pixel10, height: appDimension.pixel10, borderRadius: appDimension.pixel10,
        marginLeft: 5
    }
});