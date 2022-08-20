import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView, View, Dimensions, Pressable,
    Text,TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
import BottomSheet, { BottomSheetRefProps } from '../Test/BottomSheet';
function DetailPage(props: any) {

    const ref = useRef<BottomSheetRefProps>(null);
    const [item, setItem] = useState({});
    useEffect(() => {
        setItem(props.route.params);
        console.log(item);
        onPress()
    }, [ref]);


    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(220);
        } else {
            ref?.current?.scrollTo(-(Dimensions.get("window").height)/1.5);
        }
    }, []);



    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
        <Header issearch={false} props={props}></Header>
        <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
         
            </View>
            <BottomSheet ref={ref}>
                <View style={{ flex: 1, backgroundColor: '#FFF',marginBottom:-200 }}>
                    <Pressable
                        style={{ flex: 1, padding: 20 }}
                        onPress={() => { }}>
                        <Text
                            onPress={() => { ref?.current?.scrollTo(0); }}
                            style={{ fontSize: 21, color: "#000" }}>{"Click to close"}</Text>
                    </Pressable>
                </View>
            </BottomSheet>
        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)