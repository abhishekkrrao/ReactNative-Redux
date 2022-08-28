import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View, Text, SafeAreaView, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from '../../../Component';
import BottomSheet, { BottomSheetRefProps } from './BottomSheet';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../../Util';
import { appColor } from '../../../../Styles';



 function ScreenTest(props: any) {


    // const state = useSelector((state) => state);
   
    const ref = useRef<BottomSheetRefProps>(null);


    useEffect(()=>{
        // console.log(state)
        console.log(props)
    },[])

    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-(Dimensions.get("window").height / 2.5));
        }
    }, []);

    return (<SafeAreaView testID={"ScreenTest"} style={{ flex: 1 }}>
        <Header style={{ width: "100%" }} props={props} ></Header>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={onPress} />
                <BottomSheet ref={ref}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {/* <Pressable
                                style={{ flex: 1, padding:20 }}
                                onPress={() => { }}>
                                <Text
                                    onPress={() => { ref?.current?.scrollTo(0); }}
                                    style={{ fontSize: 21, color: appColor.black }}>{"Click to close"}</Text>
                            </Pressable> */}
                    </View>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    </SafeAreaView>);
}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenTest);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: appColor.black,
        opacity: 0.6,
    },
});