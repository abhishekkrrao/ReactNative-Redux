import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, FlatList, Text,
    Dimensions, Pressable, Image, StatusBar, Platform
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { Header, GridView } from "../../../Component";
import { CommonStyle, appColor } from "../../../../Styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BackButton } from "../../../Component";

const wishlistRecord = record.output.category[3].children;

function WishlistPage(props) {


    const [item, setItem] = useState({});
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        setItem(props.route.params);
        setWishlist(wishlistRecord);
        console.log(item)
    }, []);


    /***
     * 
     * like item
     */
    const likeItem = (item) => {
        let index = wishlist.indexOf(item);
        const result = wishlist.map((sObj, position) => {
            if (index == position) {
                sObj.like = !sObj.like;
            }
            return sObj;
        });
        setWishlist(result);
    }


    /**
    * 
    * add item into cart
    * @param {*} item 
    */

    const addItem = (item) => {
        let index = wishlist.indexOf(item);
        const result = wishlist.map((sObj, position) => {
            if (index == position) {
                sObj.count ? sObj.count += 1 : sObj.count = 1;
            }
            return sObj;
        });
        setWishlist(result);
    }

    /**
     * Remove Items
     * @param {*} item 
     */

    const removeItem = (item) => {
        let index = wishlist.indexOf(item);
        const result = wishlist.map((sObj, position) => {
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
        setWishlist(result);
    }

    const onClick = () => { props.navigation.navigate("Home") }

    return (<SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 16, paddingTop: Platform.OS == "android" ? 16 : 0 }}>
            <BackButton onClick={() => onClick()} screenTitle={"Your Wishlist"} props={props} ></BackButton>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                nestedScrollEnabled={true}
                numColumns={2}
                style={{ width: "100%" }}
                data={wishlist}
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