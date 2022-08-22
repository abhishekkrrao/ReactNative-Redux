import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, Text, Image, Platform, Pressable, ScrollView,
    StyleSheet, FlatList, Dimensions, Animated,
    StatusBar
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { CommonStyle } from "../../../../Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GridView } from "../../../Component";
const MaximumValue = 800;
const MaximumDuration = 100;

function MainPage(props) {

    /**
     * initiliaze the state
     */
    const [state, setState] = useState({});
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
    }, []);

    const startAnimation = () => {
        Animated.timing(value, {
            // toValue: 0,
            duration: MaximumValue,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        startAnimation();
    }, [value]);


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
                style={[CommonStyle.iosShadow, {
                    width: 166, height: 66,
                    marginLeft: 0, justifyContent: "center", alignItems: "center"
                }, { marginTop: 20 }]}>
                <Pressable
                    onPress={() => {
                        items.isCheck = !items.isCheck;
                        setAllCList([]);
                        setAnimValue(new Animated.Value(0));
                        const result = clist;
                        setAllCList(result);
                    }}
                    style={{
                        backgroundColor: items?.isCheck ? "#000" : "#FFF", padding: 20, borderRadius: 15,
                        width: 156, flexDirection: "row"
                    }}>
                    <Icon name="gesture-two-double-tap" color={(items?.isCheck ? "#FFF" : "#000")} size={24} />
                    <Text style={{
                        padding: 5, fontSize: 11, fontFamily: "Montserrat-Medium",
                        color: (items?.isCheck ? "#FFF" : "#000")
                    }}>{items?.name}</Text>

                    <View
                        style={{
                            position: "absolute", right: 10, top: -20, width: 46,
                            height: 76, borderRadius: 26, backgroundColor: "#FFF"
                        }}>
                        <Image
                            resizeMode={"cover"}
                            source={{ uri: items?.thumb }}
                            style={{
                                width: 46, height: 76, borderRadius: 26
                            }}></Image>
                    </View>


                </Pressable>

            </View>
        );
    }

    /**
     * Main Layout
     */


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

            <ScrollView

                style={{ flex: 1, padding: 10 }}>

                {/* Montserrat-Bold */}

                <View style={{ width: "100%", flexDirection: "row", margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: "Montserrat-Medium" }}>{"What do you want to buy today ?"}</Text>
                        {/* <Text style={{ fontSize: 24, paddingTop: 2, fontFamily: "Montserrat-Regular" }}>{"Great for life"}</Text> */}
                    </View>
                    <Pressable
                    onPress={()=>{
                        props.navigation.navigate("ExploreScreen")
                    }}
                    style={{
                        flex: 1, alignItems: "flex-end", justifyContent: "center",
                        paddingEnd: 15
                    }}>
                        <Ionicons name="person-circle-sharp" size={45} color="#000" />
                    </Pressable>
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
                        justifyContent: "center", alignItems: "center", backgroundColor: "#40241a", padding: 5,
                        borderRadius: 11
                    }}>
                        <Icon name="widgets" size={30} color="#FFF" />
                    </View> */}
                </View>

                <Text style={{
                    fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 15,
                    paddingLeft: 10
                }}>{"Categories"}</Text>


                <View style={{ width: "100%", height: 96 }}>
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
                    onPress={()=>{props.navigation.navigate("TrendingPage")}}
                    style={{
                        fontSize: 15, fontFamily: "Montserrat-Bold", marginTop: 10,
                        marginBottom: 5, textAlign: "right", flex: 1, paddingEnd: 10,
                        color: "#524c00"
                    }}>{"Show all"}</Text>
                </View>

                <View
                    style={{ width: "100%", height: 'auto' }}>
                    <ScrollView
                        horizontal={false}>
                        <View style={{
                            width: "100%", flexDirection: 'row', flexWrap: "wrap"
                        }}>
                            {clist.map((value, index) => <GridView
                                item={value}
                                props={props}
                                index={index}
                                removeItem={removeItem}
                                addItem={addItem}></GridView>)}
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
                    }}>{"Your Recent jewelleries"}</Text>
                    <Text
                     onPress={()=>{props.navigation.navigate("TrendingPage")}}
                    style={{
                        fontSize: 15, fontFamily: "Montserrat-Bold", marginTop: 10,
                        marginBottom: 5, textAlign: "right", flex: 1, paddingEnd: 10,
                        color: "#524c00"
                    }}>{"Show all"}</Text>
                </View>


                <View
                    style={{ flex: 1 }}>
                    <ScrollView
                        horizontal={false}>
                        <View style={{
                            width: "100%", flexDirection: 'row', flexWrap: "wrap"
                        }}>
                            {clist.map((value, index) => <GridView
                                item={value}
                                props={props}
                                index={index}
                                removeItem={removeItem}
                                addItem={addItem}></GridView>)}
                        </View>
                    </ScrollView>
                </View>


                <View style={{ width: "100%", height: 50 }}></View>

            </ScrollView>
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