import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView, View, Dimensions, Pressable,
    Text, TouchableOpacity, ScrollView, Image
} from "react-native";
import { connect } from "react-redux";
import { CommonStyle } from '../../../../Styles';
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";
import { CustomButton } from '../../../CustomModules';




function DetailPage(props) {

    const [item, setItem] = useState({});
    const [slides, setSlides] = useState([{ uri: "https://joolkart-dev-bucket.s3-ap-south-1.amazonaws.com/uploads/products/img_1000/1658773621nT7KC0H.jpeg" }]);
    useEffect(() => {
        setItem(props.route.params);
        console.log(item);
        // onPress()
    }, []);






    return (<View style={{ flex: 1 }}>

        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
            <Header issearch={false} props={props}></Header>
            <ScrollView
                nestedScrollEnabled={true}
                // contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "column" }}>

                    <View style={{ flex: 1, height: 300 }}>



                        <Image
                            source={{ uri: slides[0].uri }}
                            style={{
                                width: "100%", height: 300
                            }}></Image>


                    </View>
                    <View style={[{
                        flex: 1, backgroundColor: "#FFF", borderTopEndRadius: 36,
                        borderTopLeftRadius: 36, height: Dimensions.get("screen").height / 1.5, width: "100%",
                        marginTop: -36
                    }]}>
                        <Text style={{ padding: 10, fontSize: 21 }}>{"fdgd"}</Text>
                        <Text style={{ padding: 10, fontSize: 21 }}>{"fdgd"}</Text>
                        <Text style={{ padding: 10, fontSize: 21 }}>{"fdgd"}</Text>
                        <Text style={{ padding: 10, fontSize: 21 }}>{"fdgd"}</Text>
                        <Text style={{ padding: 10, fontSize: 21 }}>{"fdgd"}</Text>
                        <CustomButton
                            textStyle={{ fontFamily: "Montserrat-Medium" }}
                            value={"Buy Now"}
                            onPress={() => {
                                console.log("olacab")
                            }}
                            btnStyle={{ backgroundColor: "#40241a", width: "90%", alignSelf: "center" }}>

                        </CustomButton>

                    </View>
                    {/* <BottomSheet ref={ref}>
<View style={{ flex: 1, backgroundColor: '#FFF',marginBottom:-200 }}>
<Pressable
    style={{ flex: 1, padding: 20 }}
    onPress={() => { }}>
    <Text
        onPress={() => { ref?.current?.scrollTo(0); }}
        style={{ fontSize: 21, color: "#000" }}>{"Click to close"}</Text>
</Pressable>
</View>
</BottomSheet> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>)
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)