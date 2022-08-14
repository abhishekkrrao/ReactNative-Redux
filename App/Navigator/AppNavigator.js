/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SceenA, SceenB, HomeScreen, LoginPage, RegisterPage } from '../src';
import { createStackNavigator } from '@react-navigation/stack';
import { mapDispatchToProps, mapStateToProps, LocalStorage } from "../Util";
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { screenOptionStyle } from './style'



const Auth = createStackNavigator();
const AuthStack = () => (
    <Auth.Navigator initialRouteName="LoginPage" screenOptions={screenOptionStyle}>
        <Auth.Screen name="LoginPage" component={LoginPage} />
        <Auth.Screen name="RegisterPage" component={RegisterPage} />
    </Auth.Navigator>
);
const Drawer = createStackNavigator();
const DrawerStack = () => (
    <Drawer.Navigator screenOptions={screenOptionStyle} initialRouteName="HomeScreen">
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="SceenA" component={SceenA} />
        <Drawer.Screen name="SceenB" component={SceenB} />
    </Drawer.Navigator>
);
const RootStack = createStackNavigator();
function AppNavigator(props) {


    const state = useSelector((state) => state.Auth);
    const [isSignedIn, setIslogin] = useState(false);

    const _checkUser = () => {
        LocalStorage.localStorageInstance.getData("user")
            .then((value) => {
                if (value != null) {
                    setIslogin(value.islogin)
                }
            })
    }



    useEffect(() => {
        _checkUser();
        (state && state.user && state.user.islogin) ? setIslogin(state.user.islogin) : setIslogin(false);
    }, [state]);
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={screenOptionStyle}>
                {!isSignedIn ? <RootStack.Screen name='Auth' component={AuthStack}></RootStack.Screen> : <RootStack.Screen name='App' component={DrawerStack}></RootStack.Screen>}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
