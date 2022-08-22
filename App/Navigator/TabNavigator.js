import React from 'react';
import { StyleSheet, Image, View, Text, LogBox, Pressable, Platform, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, MainPage, DetailPage, SceenA, WishlistPage, ProfilePage } from '../src';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { screenOptionStyle } from "./style"
import { appColor } from '../Styles';

const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs(true);
function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <View style={styles.tabStyle}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, { screen: route.name });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View
                        key={index.toString()}
                        style={styles.tabViewStyle}>
                        <View
                            style={[
                                styles.tabIsFocusStyle,
                                { backgroundColor: isFocused ? appColor.appColor : '#FFF' },
                            ]}
                        />
                        <Pressable
                            android_ripple={{ color: '#cccccca6', borderless: true }}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabButtonStyle}>
                            {getIcon(label, isFocused)}

                            <Text
                                style={[
                                    styles.tabButtonText,
                                    { color: isFocused ? appColor.appColor : '#CCC' },
                                ]}>
                                {label}
                            </Text>
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
}
const getIcon = (label, isFocused) => {
    if (label === 'HOME') {
        return (<AntDesign name="home" size={24} color={(isFocused ? appColor.appColor : "#CCC")}></AntDesign>);
    } else if (label === 'WISHLIST') {
        return (<Icon name="heart-outline" size={24} color={(isFocused ? appColor.appColor : "#CCC")}></Icon>);
    } else if (label === 'ME') {
        return (<Ionicons name="person-outline" size={24} color={(isFocused ? appColor.appColor : "#CCC")}></Ionicons>);
    }
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={screenOptionStyle}
            tabBarOptions={() => { }}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
                name="Home"
                component={MainPage}
                options={{ title: 'Home'.toUpperCase() }}
            />
            <Tab.Screen
                name="WishList"
                component={WishlistPage}
                options={{ title: 'Wishlist'.toUpperCase() }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfilePage}
                options={{ title: 'Me'.toUpperCase() }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabStyle: {
        flexDirection: 'row',
        height: 70,
    },
    tabIconStyle: {
        width: 24,
        height: 24,
    },
    tabViewStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: Platform.OS === 'ios' ? 6 : 0,
            height: Platform.OS === 'ios' ? 0 : 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    tabIsFocusStyle: {
        height: 2,
        width: 60,
        alignSelf: 'center',
    },
    tabButtonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    tabButtonText: {
        fontSize: 10,
        padding: 5,
    },
});
export default TabNavigator;