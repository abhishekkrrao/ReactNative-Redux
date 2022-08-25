import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
function CartPage(props) {

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => { }, []);

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}></View>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)