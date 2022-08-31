import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import { Header, NoRecordPage } from "../../../Component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { appColor } from "../../../../Styles";
function SearchPage(props) {


    const [item, setItem] = useState([]);
    const [value, setValue] = useState("");
    useEffect(() => {
        // console.log(value)dfgdsf
    }, [value]);


    return (<SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
        <Header value={value} onChange={(value) => { setValue(value) }} issearch={true} props={props}></Header>
        <View style={{ flex: 1, padding: 20 }}>
            {item.length <= 0 && <NoRecordPage screenTitle={"Please try another keyword to get the relevant result."}></NoRecordPage>}
        </View>
    </SafeAreaView>);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)