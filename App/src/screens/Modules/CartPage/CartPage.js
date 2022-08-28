import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Header,NoRecordPage } from "../../../Component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { appColor } from "../../../../Styles";

function CartPage(props) {

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => { }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
            <Header screenTitle={"Cart"} issearch={false} isTrending={true} props={props}></Header>
            <View style={{ flex: 1 }}>


                {cartItems.length <= 0 && <NoRecordPage screenTitle={"No Items found in your cart..."} />}

            </View>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)