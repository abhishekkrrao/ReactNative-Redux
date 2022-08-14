/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SceenA, SceenB, HomeScreen, LoginPage, RegisterPage } from '../src/screens/index';
import { createStackNavigator, CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';

const screenOptionStyle = {
    headerShown: false,
    headerStyle: {
        backgroundColor: "#FFF",
    },
    headerTintColor: "#000",
    headerBackTitle: '',
    gestureEnabled: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyleInterpolators: HeaderStyleInterpolators.forSlideRight,
};
const Stack = createStackNavigator();
function AuthNavigator(props) {

    // const [islogin, setIslogin] = useState(true);
    // const [initialRoute, setInitialRoute] = useState('LoginPage');
    // useEffect(() => {
    //     setInitialRoute('HomeScreen');
    //     islogin ? props.navigation.navigate("HomeScreen") : props.navigation.navigate("LoginPage");
    // }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                options={{ gestureDirection: 'horizontal-inverted' }}
                screenOptions={screenOptionStyle}
                initialRouteName={'HomeScreen'}>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="SceenA"
                    component={SceenA}
                />
                <Stack.Screen
                    name="SceenB"
                    component={SceenB}
                />
                <Stack.Screen
                    name="LoginPage"
                    component={LoginPage}
                />
                <Stack.Screen
                    name="RegisterPage"
                    component={RegisterPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AuthNavigator;