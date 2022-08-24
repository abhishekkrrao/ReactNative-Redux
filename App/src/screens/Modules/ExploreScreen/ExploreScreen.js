import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet, Text, TextInput, View, ScrollView, Animated,
    Image, TouchableOpacity, Dimensions, Platform, Pressable
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { markers, mapStandardStyle } from '../../../../Util/mapData';
import { CustomButton } from '../../../CustomModules';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const ExploreScreen = (props) => {

    const _map = useRef(null);
    const _currentMarker = useRef(null);
    const _scrollView = useRef(null);
    const initialMapState = {
        markers,
        categories: [
            {
                name: 'Fastfood Center',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
            },
            {
                name: 'Restaurant',
                icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Dineouts',
                icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Snacks Corner',
                icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
            },
            {
                name: 'Hotel',
                icon: <MaterialCommunityIcons name="home" style={styles.chipsIcon} size={15} />,
            },
        ],
        region: {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };

    const [state, setState] = useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= state.markers.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    _map?.current?.animateToRegion ? _map?.current?.animateToRegion({
                        ...coordinate,
                        latitudeDelta: state.region.latitudeDelta,
                        longitudeDelta: state.region.longitudeDelta,
                    }, 1000) : "";
                }
            }, 10);
        });
    });

    const interpolations = state.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
        console.log(markerID)
        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }
        _currentMarker.current = markerID;
        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }



    return (
        <View style={styles.container}>
            <MapView
                zoomEnabled={true}
                mapType={"standard"}
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                showsUserLocation={true}
                showsScale={true}
                tintColor={"#000"}
                customMapStyle={mapStandardStyle}>


                {state.markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                            onPress={(e) => onMarkerPress(e)}>
                            <Animated.View
                                style={[styles.markerWrap, {
                                    padding: 10, width: "auto", height: "auto",
                                    backgroundColor: (_currentMarker.current == index) ? "#FFF" : "", borderRadius: 26
                                }]}>
                                {(_currentMarker.current == index) && <Text style={{
                                    backgroundColor: "#FFF", color: "#000",
                                    fontSize: 11, fontFamily: "Montserrat-Regular", paddingBottom: 5
                                }}>{marker.title}</Text>}
                                {/* <Text>{marker.description}</Text> */}
                                <Animated.Image
                                    source={require('../../../../../assets/map_marker.png')}
                                    style={[styles.marker, scaleStyle, { tintColor: "#40241A" }]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
            </MapView>

            <Pressable
                onPress={() => { props.navigation.pop() }}
                style={[styles.btn, { justifyContent: "center", alignItems: "center" }]}>
                <MaterialCommunityIcons name="keyboard-backspace" style={styles.chipsIcon} color={"#FFF"} size={36} />
            </Pressable>
            <View style={styles.searchBox}>

                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {state.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}>
                {state.markers.map((marker, index) => (<View style={[styles.card, { width: CARD_WIDTH, height: "auto" }]} key={index}>
                    <Image
                        source={{ uri: marker.image }}
                        style={[styles.cardImage, { height: 120 }]}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                        <Text style={styles.cardtitle}>{marker.title}</Text>
                        <Text
                            numberOfLines={2}
                            style={[styles.cardDescription]}>{marker.description}</Text>
                        <View style={[styles.button]}>

                            <CustomButton
                                value={"Buy Now"}
                                btnStyle={{ width: 120, height: "auto", backgroundColor: "#40241A" }}
                                textStyle={{ fontSize: 14, padding: 5, color: "#FFF", fontFamily: "Montserrat-Bold" }}></CustomButton>
                        </View>
                    </View>
                </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        width: 56, height: 56, backgroundColor: "#40241a",
        borderRadius: 56, position: "absolute", top: 46, left: 26
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 140 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        display: "none"
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 190 : 80,
        paddingHorizontal: 10,
        display: "none"
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 25,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 25,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        marginBottom: 20
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: 200,
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
        fontFamily: "Montserrat-Regular"
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        // backgroundColor: "#FFF"
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: "flex-start",
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});