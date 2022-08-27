import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Header } from "../../../Component";

function CartPage(props) {

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => { }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
            <View style={{ flex: 1 }}>
                <Header screenTitle={"Cart"} issearch={false} isTrending={true} props={props}></Header>
            </View>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)