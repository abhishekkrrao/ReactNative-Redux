import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, FlatList, Text,
    Dimensions, Pressable, Image, StatusBar, Platform
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { Header, GridView } from "../../../Component";
import { CommonStyle } from "../../../../Styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackButton } from "../../../Component";

function WishlistPage(props) {


    const [item, setItem] = useState({});
    const [clist, setAllCList] = useState([]);

    useEffect(() => {
        setItem(props.route.params);
        setAllCList(record.output.category);
        console.log(item)
    }, []);


    /***
     * 
     * like item
     */
    const likeItem = (item) => {
        let index = clist.indexOf(item);
        const result = clist.map((sObj, position) => {
            if (index == position) {
                sObj.like = !sObj.like;
            }
            return sObj;
        });
        setAllCList(result);
    }


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

    const onClick = () => { props.navigation.navigate("Home") }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: "#efebe9" }}>

        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 16, paddingTop: 16 }}>
        <BackButton onClick={() => onClick()} screenTitle={"Your Wishlist"} props={props} ></BackButton>

            {/* <Pressable
                onPress={() => { props.navigation.navigate("Home") }}
                style={[{
                    width: 55, height: 55, backgroundColor: "#FFF", borderRadius: 56
                }, { justifyContent: "center", zIndex: 1, alignItems: "center" }]}>
                <MaterialCommunityIcons name="keyboard-backspace" color={"#000"} size={28} />
            </Pressable>
            <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: "Montserrat-Bold", flex: 1 }}>{"Your Wishlist"}</Text>
            </View> */}
        </View>


        <View style={{ flex: 1, padding: 10 }}>
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
                    index={(index + 33)}
                    removeItem={removeItem}
                    likeItem={likeItem}
                    addItem={addItem}></GridView>}>
            </FlatList>
        </View>
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage)