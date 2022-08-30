import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../Util";
import {
    SafeAreaView, ScrollView, View, Pressable, Text, Image, Dimensions, Platform,
    StyleSheet
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { appColor, appDimension, fontStyle } from "../../../../Styles";
import { Header, NoRecordPage } from "../../../Component";

function NotificationPage(props) {

    const [notifications, setNotification] = useState([]);

    return (<SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
        <Header screenTitle={"Notification"} isTrending={false} issearch={false} props={props}></Header>
        <View style={{ flex: 1 }}>
            {notifications.length == 0 && <NoRecordPage screenTitle={"You don't have any notification yet."}></NoRecordPage>}
        </View>
    </SafeAreaView>)
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)