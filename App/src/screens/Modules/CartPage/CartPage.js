import { connect } from "react-redux";
import { data, mapDispatchToProps, mapStateToProps } from "../../../../Util";
import React, { useEffect, useState, useRef } from "react";
import {
    SafeAreaView, View, Text, Image,
    FlatList,
    Pressable,
    Dimensions,
    ScrollView,
    StyleSheet
} from "react-native";
import { Header, NoRecordPage, HorizontalView, Footer } from "../../../Component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { appColor, appDimension, fontStyle } from "../../../../Styles";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
const { height } = Dimensions.get("window");
function CartPage(props) {

    const [cartItems, setCartItems] = useState([]);
    const initialMode = useRef(true);

    useEffect(() => {

        const list = data.map((item) => item);
        setCartItems(list);
        initialMode.current = false;
    }, []);

    const onDelete = (position) => {
        setCartItems((cartItems) => {
            return cartItems.filter((item, index) => position !== index);
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
            <Header screenTitle={"Cart"} issearch={false} isTrending={true} props={props}></Header>
            <View
                // nestedScrollEnabled={true}
                style={[{ flex: 1 }]}>

                {cartItems.length <= 0 && <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <NoRecordPage screenTitle={"You don't have any items in your cart..."} />
                </View>}

                {cartItems.length > 0 && <Animated.FlatList
                    entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
                    exiting={FadeOut.delay(300)}
                    layout={Layout.delay(100)}
                    style={{ width: "100%" }}
                    data={cartItems}
                    onEndReached={({ distanceFromEnd }) => {
                        console.log(distanceFromEnd)
                    }}
                    renderItem={({ item, index }) => <HorizontalView onDelete={() => { onDelete(index) }} item={item} index={index}></HorizontalView>}>
                </Animated.FlatList>}

                <View style={{ width: "100%", height: 130, borderTopRightRadius: 36, borderTopLeftRadius: 36 }}></View>


                <View style={styles.footer}>
                    <Footer checkOutClick={() => { }} total={4500} discount={45} bagTotal={4455} isCart={true}></Footer>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

const styles = StyleSheet.create({
    footer: {
        width: "100%", backgroundColor: "#FFF", padding: 20, position: "absolute", left: 0, bottom: -30,
        borderTopRightRadius: 36, borderTopLeftRadius: 36
    }
})