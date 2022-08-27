import React from 'react';
import { View,ActivityIndicator } from 'react-native';
function SplashPage() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator
                size="large" color="#000"
            />
        </View>
    );
}
export default SplashPage;