import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header, NoRecordPage } from "../../../Component";
import Ionicons from "react-native-vector-icons/Ionicons";

function SearchPage(props) {


    const [item, setItem] = useState([]);
    const [value, setValue] = useState("");
    useEffect(() => {
        // console.log(value)dfgdsf
    }, [value]);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>
        <Header
            value={value}
            onChange={(value) => { setValue(value) }}
            issearch={true} props={props}></Header>
        <View style={{ flex: 1, padding: 20 }}>


            {item.length <= 0 && <NoRecordPage screenTitle={"No Record found..."}></NoRecordPage>}
        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)