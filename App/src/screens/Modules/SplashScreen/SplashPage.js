import React from 'react';
import { View,ActivityIndicator } from 'react-native';
import { appColor } from '../../../../Styles';
function SplashPage() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator
                size="large" color={appColor.black}
            />
        </View>
    );
}
export default SplashPage;