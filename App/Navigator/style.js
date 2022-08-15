import { CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
export const screenOptionStyle = {
    headerShown: false,
    headerStyle: { backgroundColor: "#FFF" },
    headerTintColor: "#000",
    headerBackTitle: '',
    gestureEnabled: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyleInterpolators: HeaderStyleInterpolators.forSlideRight,
};