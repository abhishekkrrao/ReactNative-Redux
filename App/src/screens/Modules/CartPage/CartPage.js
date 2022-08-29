import { connect } from "react-redux";
import { data, mapDispatchToProps, mapStateToProps } from "../../../../Util";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, Text, Image,
    FlatList,
    Pressable,
    Dimensions
} from "react-native";
import { Header, NoRecordPage, HorizontalView } from "../../../Component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { appColor, appDimension, fontStyle } from "../../../../Styles";
import { CustomButton } from "../../../CustomModules";


const { height } = Dimensions.get("window");

function CartPage(props) {

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        setCartItems(data)
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
            <Header screenTitle={"Cart"} issearch={false} isTrending={true} props={props}></Header>
            <View style={{ flex: 1 }}>
                {cartItems.length <= 0 && <NoRecordPage screenTitle={"No Items found in your cart..."} />}

                <View style={{ width: "100%", height: height / 1.46, zIndex: 1 }}>
                    <FlatList
                        style={{ width: "100%" }}
                        data={cartItems}
                        onEndReached={({ distanceFromEnd }) => {
                            console.log(distanceFromEnd)
                        }}
                        renderItem={({ item, index }) => <HorizontalView item={item} index={index}></HorizontalView>}>
                    </FlatList>
                </View>
                <View style={{ flex: 1, backgroundColor: "#FFF", padding: 20, marginBottom: -30 }}>

                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                        textAlign:"left" }}>{" Total"}</Text>
                        <Text style={{
                            flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                            textAlign: "center"
                        }}>{"$4856"}</Text>
                    </View>

                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: appColor.black, fontFamily: fontStyle.bold,
                        textAlign:"left" }}>{"Discount"}</Text>
                        <Text style={{
                            flex: 1, color: appColor.black, fontFamily: fontStyle.bold,
                            textAlign: "center"
                        }}>{"- $20"}</Text>
                    </View>

                    <View style={{ width: "100%", flexDirection: "row", marginBottom: 20 }}>
                        <Text style={{ flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                        textAlign:"left" }}>{"Bag Total"}</Text>
                        <Text style={{
                            flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                            textAlign: "center"
                        }}>{"$4836"}</Text>
                    </View>


                    <CustomButton
                        textStyle={{ fontFamily: fontStyle.bold }}
                        value={"Checkout"}></CustomButton>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)