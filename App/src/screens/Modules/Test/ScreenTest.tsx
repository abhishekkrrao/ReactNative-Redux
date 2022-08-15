import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from './BottomSheet';

export default function ScreenTest() {
    const ref = useRef<BottomSheetRefProps>(null);

    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-200);
        }
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={onPress} />
                <BottomSheet ref={ref}>
                    <View style={{ flex: 1, backgroundColor: 'orange' }}>
                        <Pressable
                            onPress={() => {  }}>
                            <Text
                                onPress={() => {  ref?.current?.scrollTo(0); }}
                                style={{ fontSize: 21, color: "#FFF" }}>{"Close"}</Text>
                        </Pressable>
                    </View>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'white',
        opacity: 0.6,
    },
});