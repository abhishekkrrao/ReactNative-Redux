import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Header,NoRecordPage } from "../../../Component";
import Ionicons from "react-native-vector-icons/Ionicons";

function CartPage(props) {

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => { }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
            <Header screenTitle={"Cart"} issearch={false} isTrending={true} props={props}></Header>
            <View style={{ flex: 1 }}>


                {cartItems.length <= 0 && <NoRecordPage screenTitle={"No Record found..."} />}

            </View>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)