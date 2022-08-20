import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header } from "../../../Component";


function SearchPage(props) {


    const [item, setItem] = useState({});
    const [value, setValue] = useState("");
    useEffect(() => {
        // console.log(value)dfgdsf
    }, [value]);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Header
            value={value}
            onChange={(value) => { setValue(value) }}
            issearch={true} props={props}></Header>
        <View style={{ flex: 1, padding: 20 }}>

        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)