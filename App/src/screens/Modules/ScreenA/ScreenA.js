import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { data, mapDispatchToProps, mapStateToProps, record } from "../../../../Util";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../Component";
import { connect } from 'react-redux';
function SceenA(props) {
    const [allData, setAllRecord] = useState([]);
    useEffect(() => {
        setAllRecord(record.output.category);
    }, []);
    const _OnlistContentShown = (items, index) => {
        return (
            <View
                key={items?.id}
                style={[styles.gridIngredients, { padding: 20, marginTop: 15 }]}>
                <Pressable
                    onPress={() => {
                        props.navigation.navigate("SceenB");
                    }}
                    style={{ flex: 1 }}>
                    <Image
                        style={styles.ingredientImage}
                        resizeMode="contain"
                        source={{ uri: items.thumb }}
                    />
                    <Text
                        numberOfLines={1}
                        style={styles.ingredientsText}>{items.meta_title}</Text>
                </Pressable>
            </View>
        );
    }
    return (<SafeAreaView style={styles.container}>
        <View style={[styles.containerChild]}>
            <Header style={{ width: "100%" }} props={props} />
            <ScrollView
                style={[styles.containerChild]}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {allData.map((value, index) => {
                        return _OnlistContentShown(value, index);
                    })}
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {allData.map((value, index) => {
                        return _OnlistContentShown(value, index);
                    })}
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>);
}
export default connect(mapStateToProps, mapDispatchToProps)(SceenA);
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
    containerChild: { flex: 1 },
    ingredientsText: {
        fontSize: 12, color: 'black', paddingTop: 5, top: 0
    },
    gridIngredients: {
        width: '45.5%', flexDirection: "column", backgroundColor: '#CCC', borderRadius: 8,
        marginLeft: 10, marginEnd: 5, marginTop: 5, overflow: "hidden", justifyContent: "center", alignItems: "center"
    },
    ingredientImage: {
        width: 136, height: 136, top: 0
    },
});