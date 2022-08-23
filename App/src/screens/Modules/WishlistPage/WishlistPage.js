import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, FlatList, Text,
    Dimensions, Pressable, Image, StatusBar
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { Header, GridView } from "../../../Component";
import { CommonStyle } from "../../../../Styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function WishlistPage(props) {


    const [item, setItem] = useState({});
    const [clist, setAllCList] = useState([]);

    useEffect(() => {
        setItem(props.route.params);
        const item = record.output.category;
        setAllCList([...item,...record.output.category]);
        console.log(item)
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



    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

        <Pressable
            onPress={() => { props.navigation.navigate("Home") }}
            style={[{
                width: 56, height: 56, backgroundColor: "#40241a",
                borderRadius: 56, position: "absolute", top: 36, left: 16
            }, { justifyContent: "center", alignItems: "center", zIndex: 1 }]}>
            <MaterialCommunityIcons name="keyboard-backspace" color={"#FFF"} size={36} />
        </Pressable>
        <View style={{ flex: 1,padding:10 }}>

            <Text style={{
                fontSize: 17, fontFamily: "Montserrat-Bold", marginTop: 55,
                paddingLeft: 10
            }}>{"Your Wishlist"}</Text>

            <FlatList
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
            </FlatList>
        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage)