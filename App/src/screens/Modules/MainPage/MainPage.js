import React, { useEffect, useState, useRef } from "react";
import {
    SafeAreaView, View, Text, Image, Platform, Pressable, ScrollView,
    StyleSheet, FlatList, Dimensions, Animated,
    StatusBar,
    Alert
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { CommonStyle } from "../../../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GridView, MyLoader } from "../../../Component";
import { Carousel } from 'react-native-snap-carousel-v4';


const MaximumValue = 800;
const MaximumDuration = 100;
const sliderWidth = Dimensions.get("window").width;
function MainPage(props) {

    /**
     * initiliaze the state
     */
    const _carousel = useRef(null);
    const [slides, setSlides] = useState([{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }]);
    const [entries, setEntries] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [allData, setAllRecord] = useState([]);
    const [clist, setAllCList] = useState([]);
    const [value, setAnimValue] = useState(new Animated.Value(0))


    /**
     * update the state
     */

    useEffect(() => {
        setState(props);
        console.log(props);
        setAllRecord(record.output.category);
        setAllCList(record.output.category);

        setTimeout(() => {
            setLoading(false)
        }, 1000);

        getMoviesFromApi();

    }, []);


    const getMoviesFromApi = () => {
        return fetch('https://reactnative.dev/movies.json')
            .then((response) => response.json())
            .then((json) => {
                console.log(json.movies);
                return json.movies;
            })
            .catch(() => {
                Alert.alert("Check Your Internet Connections .....")

                console.log("Check Your Internet Connections .....");
            });
    };


    const startAnimation = () => {
        Animated.timing(value, {
            // toValue: 0,
            duration: MaximumValue,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        startAnimation();
    }, []);

    /**
     * 
     * like items
     */

    const likeItem = (item) => {
        let index = clist.indexOf(item);
        const result = clist.map((sObj, position) => {
            if (index == position) {
                sObj.like = !sObj.like;
            }
            return sObj;
        });
        setAllCList(result);
    }

    /**
     * 
     * add item into cart
     * @param {*} item 
     */

    const addItem = (item) => {
        let index = clist.indexOf(item);
        const result = clist.map((sObj, position) => {
            if (index == position) {
                sObj.count ? sObj.count += 1 : sObj.count = 1;
            }
            return sObj;
        });
        setAllCList(result);
    }

    /**
     * Remove Items
     * @param {*} item 
     */

    const removeItem = (item) => {
        let index = clist.indexOf(item);
        const result = clist.map((sObj, position) => {
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
        setAllCList(result);
    }


    const mm = (value) => {
        {
            CommonStyle.iosShadow, {
                opacity: value,
                transform: [
                    { scale: value },
                    {
                        rotate: value.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['50deg', '0deg'],
                            extrapolate: 'identity',
                        })
                    }
                ]

            }
        }
    }



    const _renderItem = ({ item, index }) => {
        return (
            <Pressable
                onPress={() => { props.navigation.navigate("DetailPage", item); }}
                key={(parseInt(index))}
                style={{ width: "100%" }}>
                <Image
                    key={(parseInt(index))}
                    source={{ uri: slides[0].uri }}
                    style={{
                        width: "100%", height: 150
                    }}>
                </Image>
            </Pressable>
        );
    }



    /**
     * 
     * Horizontal Layout
     * @param {*} items 
     * @param {*} index 
     * @returns 
     */

    const _HorizontalLayout = (items, index) => {
        return (
            <View
                key={(index + 911)}
                style={[{ width: 166, justifyContent: "center", alignItems: "center", height: "auto", marginLeft: 6 }, { marginTop: 15, marginBottom: 5 }]}>
                <Pressable
                    onPress={() => {
                        items.isCheck = !items.isCheck;
                        setAllCList([]);
                        // setAnimValue(new Animated.Value(0));
                        const result = clist;
                        setAllCList(result);
                    }}
                    style={[CommonStyle.iosShadow, { backgroundColor: items?.isCheck ? "#000" : "#FFF", borderRadius: 16, flexDirection: "row", width: "100%" }]}>
                    <View style={{
                        flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center",
                        padding: 10
                    }}>
                        <Icon name="gesture-two-double-tap" color={(items?.isCheck ? "#FFF" : "#000")} size={24} />
                        <Text
                            numberOfLines={1}
                            style={{ padding: 5, fontSize: 11, fontFamily: "Montserrat-Medium", color: (items?.isCheck ? "#FFF" : "#000") }}>{items?.short_code}</Text>
                    </View>
                    <Image
                        resizeMode={"cover"}
                        source={{ uri: items?.thumb }}
                        style={{ width: 56, height: 86, flex: 1, alignSelf: "flex-end", borderTopRightRadius: 16, borderBottomRightRadius: 16 }}></Image>

                </Pressable>
            </View>
        );
    }

    /**
     * Main Layout
     */


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

            {loading && <MyLoader />}
            {!loading && <ScrollView

                style={{ flex: 1, padding: 10 }}>

                {/* Montserrat-Bold */}

                <View style={{ width: "100%", flexDirection: "row", margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: "Montserrat-Medium" }}>{"What do you want to buy today ?"}</Text>
                        {/* <Text style={{ fontSize: 24, paddingTop: 2, fontFamily: "Montserrat-Regular" }}>{"Great for life"}</Text> */}
                    </View>

                    <View style={{
                        flex: .8, flexDirection: "row", justifyContent: "flex-end", alignContent: "flex-end",
                        paddingEnd: 16
                    }}>
                        <Pressable
                            onPress={() => { props.navigation.navigate("CartPage") }}
                            style={{ padding: 5, backgroundColor: "#FFF", borderRadius: 36, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{
                                position: "absolute", top: -10, right: 5,
                                color: "#000", fontFamily: "Montserrat-Bold", fontSize: 19
                            }}>{"3"}</Text>
                            <Ionicons name="cart" size={28} color={"#000"}></Ionicons>
                        </Pressable>
                        <Pressable
                            onPress={() => { props.navigation.navigate("ExploreScreen") }}
                            style={{ padding: 5, borderRadius: 36,backgroundColor:"#FFF", marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name="person-circle-sharp" size={28} color="#000" />
                        </Pressable>
                    </View>
                </View>


                <View style={{
                    width: "100%", flexDirection: "row", alignSelf: "center", margin: 5,
                    alignItems: "center"
                }}>
                    <Pressable
                        onPress={() => props.navigation.navigate("SearchPage")}
                        style={{
                            flex: 1, flexDirection: "row",
                            backgroundColor: "#FFF", padding: 10, marginEnd: 10, borderRadius: 26,
                            justifyContent: "center", alignItems: "center"
                        }}>
                        <EvilIcons name="search" size={30} color="#757575" />
                        <Text

                            style={{ flex: 1, paddingLeft: 10, fontSize: 12, fontFamily: "Montserrat-Medium" }}>
                            {"Find the favorite jewelleries here"}
                        </Text>
                    </Pressable>
                    {/* <View style={{
                        justifyContent: "center", alignItems: "center", backgroundColor: "#000", padding: 5,
                        borderRadius: 11
                    }}>
                        <Icon name="widgets" size={30} color="#FFF" />
                    </View> */}
                </View>


                <View style={[{ width: "100%", height: "auto", flexDirection: "column", marginTop: 10 }]}>
                    <Carousel
                        ref={(c) => {
                            _carousel.current = c;
                            // console.log(_carousel?.current?._activeItem);
                        }}
                        data={[1, 2, 3, 4, 5, 6, 7, 8]}
                        renderItem={_renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={sliderWidth * 0.88}
                        autoplay={true}

                        autoplayDelay={1500}
                    // style={{ backgroundColor: "#FFF", elevation: 3 }}
                    />


                    <View style={{
                        width: "100%", flexDirection: 'row', flexWrap: "wrap",
                        marginTop: 10,
                        justifyContent: "center", alignItems: "center"
                    }}>
                        {entries.map((item, index) => {
                            return (
                                <View
                                    style={{
                                        width: 22, height: 5,
                                        backgroundColor: (_carousel?.current?._activeItem == index) ? "#FFAB00" : "#000",
                                        borderRadius: 39,
                                        zIndex: 1, marginLeft: 3
                                    }} />
                            )
                        })}
                    </View>

                </View>




                {/* Main Page Start */}

                <Text style={{
                    fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 15,
                    paddingLeft: 10
                }}>{"Categories"}</Text>


                <View style={{ width: "100%", marginBottom: 5 }}>
                    <ScrollView
                        horizontal={true}>
                        <View style={{
                            width: "100%", flexDirection: 'row', flexWrap: "nowrap"
                        }}>
                            {allData.map((value, index) => {
                                return _HorizontalLayout(value, index);
                            })}
                        </View>
                    </ScrollView>
                </View>


                <View style={{
                    width: "100%", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 10,
                        paddingLeft: 10, marginBottom: 5
                    }}>{"Trending jewelleries"}</Text>
                    <Text
                        onPress={() => { props.navigation.navigate("TrendingPage", { name: "Trending Categories" }) }}
                        style={{
                            fontSize: 15, fontFamily: "Montserrat-Bold", marginTop: 10,
                            marginBottom: 5, textAlign: "right", flex: 1, paddingEnd: 10,
                            color: "#524c00"
                        }}>{"Show all"}</Text>
                </View>



                <View style={{ width: "100%", flexDirection: 'row', flexWrap: "wrap" }}>
                    {clist.map((value, index) => <GridView
                        item={value}
                        props={props}
                        index={(parseInt(index) + 77)}
                        removeItem={removeItem}
                        likeItem={likeItem}
                        addItem={addItem}></GridView>)}
                </View>


                <View style={{
                    width: "100%", flexDirection: "row", justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 10,
                        paddingLeft: 10, marginBottom: 5
                    }}>{"Your Recent jewelleries"}</Text>
                    <Text
                        onPress={() => { props.navigation.navigate("TrendingPage", { name: "Recent Categories" }) }}
                        style={{
                            fontSize: 15, fontFamily: "Montserrat-Bold", marginTop: 10,
                            marginBottom: 5, textAlign: "right", flex: 1, paddingEnd: 10,
                            color: "#524c00"
                        }}>{"Show all"}</Text>
                </View>

                <View style={{
                    width: "100%", flexDirection: 'row', flexWrap: "wrap"
                }}>
                    {clist.map((value, index) => <GridView
                        item={value}
                        props={props}
                        index={(parseInt(index) + 99)}
                        removeItem={removeItem}
                        addItem={addItem}></GridView>)}
                </View>



                <View style={{ width: "100%", height: 50 }}></View>

            </ScrollView>}
        </SafeAreaView>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF" },
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
    }
});