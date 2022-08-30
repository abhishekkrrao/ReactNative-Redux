import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, FlatList, StatusBar
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { Header } from "../../../Component";
import { CommonStyle, appColor } from "../../../../Styles";
import { GridView } from "../../../Component";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

function TrendingPage(props) {


    const [item, setItem] = useState({});
    const [clist, setAllCList] = useState([]);

    useEffect(() => {
        setItem(props.route.params);
        const items = [...record.output.category[0].children];
        setAllCList(items);
    }, []);



    /**
    * 
    * add item into cart
    * @param {*} item 
    */

    const addItem = (item) => {
        let index = clist.indexOf(item);
        const result = clist.map((sObj, position) => {
            if (index == position) {
                sObj.count ? sObj.count += 1 : sObj.count = 1;
            }
            return sObj;
        });
        setAllCList(result);
    }

    /**
     * Remove Items
     * @param {*} item 
     */

    const removeItem = (item) => {
        let index = clist.indexOf(item);
        const result = clist.map((sObj, position) => {
            if (sObj.count && sObj.count > 0) {
                if (index == position) {
                    sObj.count ? sObj.count -= 1 : sObj.count = 1;
                }
            } else {
                if (index == position) {
                    sObj.count = 0;
                }
            }
            return sObj;
        });
        setAllCList(result);
    }


    return (<SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround, marginBottom: -30 }}>
        <Header screenTitle={item?.name} isTrending={false} issearch={false} props={props}></Header>
        <View style={{ flex: 1, padding: 10 }}>
            <Animated.FlatList
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout.delay(500)}
                nestedScrollEnabled={true}
                numColumns={2}
                style={{ width: "100%" }}
                data={clist}
                onEndReached={({ distanceFromEnd }) => {
                    console.log(distanceFromEnd)
                }}
                renderItem={({ item, index }) => <GridView
                    item={item}
                    props={props}
                    index={index}
                    removeItem={removeItem}
                    addItem={addItem}></GridView>}>
            </Animated.FlatList>
        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)