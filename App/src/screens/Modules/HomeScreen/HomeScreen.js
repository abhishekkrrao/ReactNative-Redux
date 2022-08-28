
import React, { useEffect, useState, memo } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { ListItem } from "../../../CustomModules";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../Component";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, data, record } from "../../../../Util";
import { CommonStyle } from "../../../../Styles";
function HomeScreen(props) {
    const [allData, setAllRecord] = useState([]);
    useEffect(() => {
        setAllRecord([]);
        setAllRecord(record.output.category);
    }, []);


    const _OnSliderContentShown = (items, index) => {
        return (
            <View
                key={(index + 901)}
                style={[styles.hIngredients, { width: 200, height: 200, zIndex: 1 }]}>
                <Pressable
                    onPress={() => { props.navigation.navigate("SceenA"); }}
                    style={{ flex: 1, marginTop: 5, marginStart: (index == 0) ? 0 : 10 }}>
                    <Image
                        style={[styles.hImage, { width: 195, height: 195, borderRadius: 15 },CommonStyle.shadowIOSStyle]}
                        resizeMode="contain"
                        source={{ uri: items.thumb }}
                    />
                </Pressable>
            </View>
        );
    }

    const _OnHorizontalContentShown = (items, index) => {
        return (
            <View
                key={(index + 911)}
                style={[styles.hIngredients, {
                    flexDirection: "column", borderRadius: 0,
                    backgroundColor: appColor.white, justifyContent: "center",
                    alignItems: "center", marginStart: 10, width: 72, marginBottom: 10,
                    padding: 10
                }]}>
                <Pressable
                    onPress={() => { props.navigation.navigate("SceenA"); }}
                    style={{ flex: 1 }}>
                    <Image
                        style={[styles.hImage, { height: 66, width: 66, borderRadius: 96 }]}
                        resizeMode="contain"
                        source={{ uri: items.thumb }}
                    />
                </Pressable>
                <Text
                    numberOfLines={1}
                    style={[styles.ingredientsText, { textTransform: "capitalize", fontSize: 11, paddingStart: 0 }]}>{(items.meta_title)}</Text>
            </View>
        );
    }
    function getRandomInt() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const _OnlistContentShown = (items, index) => {
        return (
            <ListItem
                key={(index + 900)}
                screen={"ScreenTest"}
                cStyle={[styles.gridIngredients, { padding: 10, marginTop: 10 }]}
                items={items}
                props={props}
                iStyle={styles.ingredientImage}
                tStyle={styles.ingredientsText}></ListItem>
        );
    }
    return (<SafeAreaView style={[styles.container]}>
        <View testID={"homescreen"} style={[styles.containerChild]}>
            <Header home={true} style={{ width: "100%" }} props={props} />
            <ScrollView
                style={[styles.containerChild, { padding: 10 }]}>

                <ScrollView
                    style={{ padding: 10 }}
                    pagingEnabled={true}
                    horizontal={true}
                    scrollEventThrottle={6}>
                    {allData.map((value, index) => {
                        return _OnSliderContentShown(value, index);
                    })}
                </ScrollView>


                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 21, fontWeight: "900", paddingLeft: 10, fontFamily: "Cochin-bold" }}>{"Categories"}</Text>
                </View>

                <ScrollView
                    horizontal={true}>
                    <View style={{ flexDirection: 'row', flexWrap: "nowrap", marginTop: 10 }}>
                        {allData.map((value, index) => {
                            return _OnHorizontalContentShown(value, index);
                        })}
                    </View>
                </ScrollView>

                <View style={{ width: "100%", paddingTop: 10 }}>
                    <Text style={{ fontSize: 21, fontWeight: "900", paddingLeft: 10, fontFamily: "Cochin-bold" }}>{"Featured Items"}</Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {allData.map((value, index) => {
                        return _OnlistContentShown(value, index);
                    })}
                </View>

                <View style={{ width: "100%", paddingTop: 10 }}>
                    <Text style={{ fontSize: 21, fontWeight: "900", paddingLeft: 15, fontFamily: "Cochin-bold" }}>{"Recent Items"}</Text>
                </View>



                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {allData.map((value, index) => {
                        return _OnlistContentShown(value, index);
                    })}
                </View>

                <View style={{ height: 30, width: "100%" }}></View>
            </ScrollView>
        </View>
    </SafeAreaView>);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
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
    }
});


// Hook
function useOnScreen(ref, rootMargin = 0) {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin,
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return isIntersecting;
}