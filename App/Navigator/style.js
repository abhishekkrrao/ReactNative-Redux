import { CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
import { appColor } from '../Styles';
export const screenOptionStyle = {
    headerShown: false,
    headerStyle: { backgroundColor: "#FFF" },
    headerTintColor: appColor.black,
    headerBackTitle: '',
    gestureEnabled: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyleInterpolators: HeaderStyleInterpolators.forSlideRight,
};