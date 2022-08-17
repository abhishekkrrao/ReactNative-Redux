import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, Text, Image, Platform, Pressable, ScrollView,
    StyleSheet,
    FlatList,
    Dimensions, Animated
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { CommonStyle } from "../../../../Styles";
import MaterialIcons from "react-native-vector-icons/Ionicons";

const MaximumValue = 800;
const MaximumDuration = 100;

function MainPage(props) {

    /**
     * initiliaze the state
     */
    const [state, setState] = useState({});
    const [allData, setAllRecord] = useState([]);
    const [clist, setAllCList] = useState([]);
    const [value,setAnimValue] = useState(new Animated.Value(0))


    /**
     * update the state
     */

    useEffect(() => {
        setState(props);
        console.log(props);
        setAllRecord(record.output.category);
        setAllCList(record.output.category);
    }, []);

    const startAnimation=()=>{
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
    /**
     * 
     * GridView Layout
     * @param {*} item 
     * @param {*} index 
     * @returns 
     */

    const _GridLayout = (item, index) => {
        return (
            <Animated.View
                key={(index + 919)}
                style={[{
                    width: ((Dimensions.get("screen").width / 2) - 20), height: "auto",
                    backgroundColor: "#FFF",
                    marginBottom: 5, marginTop: 10, marginLeft: (index % 2 == 0) ? 5 : 10,
                    flexDirection: "column", borderRadius: 16
                }, CommonStyle.iosShadow, {
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

                }]}>
                <View style={{
                    width: "100%", height: 120, backgroundColor: "#eeeeee",
                    justifyContent: "center", alignItems: "center", borderTopEndRadius: 16,
                    borderTopLeftRadius: 16
                }}>
                    <MaterialIcons name="nutrition-outline" color={"#ffc400"} size={96} />
                </View>
                <View style={{ width: "100%", flexDirection: "column", padding: 10 }}>
                    <Text style={{ color: "#9e9e9e", fontSize: 11, lineHeight: 15, fontFamily: "Roboto-Regular" }}>{"Bunch"}</Text>
                    <Text style={{ color: "#111", fontSize: 13, fontFamily: "Roboto-Bold" }}>{"Organic Banana"}</Text>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#111", fontSize: 14, flex: 1, paddingTop: 5, fontWeight: "700" }}>{"$1"}</Text>
                        <Text style={{ color: "#ffab00", fontSize: 8, flex: 1, paddingTop: 5, fontWeight: "700" }}>{"Cart " + (item?.count ? item?.count : 0)}</Text>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            {(item?.count > 0) && <Text
                                onPress={() => removeItem(item)}
                                style={{ color: "#111", fontSize: 21, paddingEnd: 20 }}>{"-"}</Text>}
                            <Text
                                onPress={() => addItem(item)}
                                style={{ color: "#111", fontSize: 21, fontWeight: "bold" }}>{"+"}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
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
                style={[CommonStyle.iosShadow, {
                    width: 80, height: 96,
                    marginLeft: 0, justifyContent: "center", alignItems: "center"
                }, { marginTop: 10 }]}>
                <Pressable
                    onPress={() => {
                        items.isCheck = !items.isCheck;
                        setAllCList([]);
                        setAnimValue(new Animated.Value(0));
                        const result = clist;
                        setAllCList(result);
                      
                    }}
                    style={{ backgroundColor: items?.isCheck ? "red" : "#e2f1f8", padding: 20, borderRadius: 15 }}>
                    <MaterialIcons name="nutrition-outline" color={(items?.isCheck ? "#FFF" : "#000")} size={24} />
                </Pressable>
                <Text style={{ padding: 5, fontFamily: "Roboto-Light", fontSize: 11 }}>{"Mango"}</Text>
            </View>
        );
    }

    /**
     * Main Layout
     */


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View
                contentContainerStyle={{ flex: 1 }}
                nestedScrollEnabled={true}
                style={{ flex: 1, padding: 10 }}>


                <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 21, fontFamily: "Roboto-Regular" }}>{"Good for you"}</Text>
                        <Text style={{ fontSize: 21, paddingTop: 2, fontFamily: "Roboto-Regular" }}>{"Great for life"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                        <MaterialIcons name="notifications-outline" color={"#000"} size={24} />
                    </View>
                </View>

                <Text style={{ fontSize: 21, fontFamily: "Roboto-Medium" }}>{"Categories"}</Text>


                <View style={{ width: "100%", height: 126 }}>
                    <ScrollView
                        horizontal={true}>
                        <View style={{
                            width: "100%", flexDirection: 'row', flexWrap: "nowrap", marginTop: 10
                        }}>
                            {allData.map((value, index) => {
                                return _HorizontalLayout(value, index);
                            })}
                        </View>
                    </ScrollView>
                </View>


                <FlatList
                    nestedScrollEnabled={true}
                    numColumns={2}
                    style={{ width: "100%" }}
                    data={clist}
                    onEndReached={({ distanceFromEnd }) => {
                        console.log(distanceFromEnd)
                    }}
                    renderItem={({ item, index }) => _GridLayout(item, index)}>
                </FlatList>


            </View>
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