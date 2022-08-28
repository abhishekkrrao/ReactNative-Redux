
import React, { useState, useMemo } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../../Component";
import { connect } from 'react-redux';
import { mapDispatchToProps,mapStateToProps } from "../../../../Util";
function SceenB(props) {
    // State for our counter
    const [count, setCount] = useState(0);
    // State to keep track of current word in array we want to show
    const [wordIndex, setWordIndex] = useState(0);
    // Words we can flip through and view letter count
    const words = ["hey", "this", "is", "cool"];
    const word = words[wordIndex];
    const computeLetterCount = (word) => {
        let i = 0;
        while (i < 1000000000) i++;
        return word.length;
    };
    const letterCount = useMemo(() => computeLetterCount(word), [word, wordIndex]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.white }}>
            <Header style={{ width: "100%" }} props={props} />
            <View style={{ padding: 15, flex: 1 }}>

                <Text style={style.txt}>{"Compute number of letters (slow 🐌)"}</Text>
                <Text style={style.txt}>{"{word} has  " + letterCount + "  letters"}</Text>
                <Pressable
                    style={style.btn}
                    onPress={() => {

                        const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
                        setWordIndex(next);
                    }}>
                    <Text>
                        {" Next word"}
                    </Text>
                </Pressable>
                <Text style={style.txt}>{"Increment a counter (fast ⚡️)"}</Text>
                <Text style={style.txt}>{"Counter: " + { count }}</Text>
                <Pressable
                    style={style.btn}
                    onPress={() => setCount(count + 1)}>
                    <Text>{"Increment"}</Text>
                </Pressable>
            </View>
        </SafeAreaView>

    );
}
export default connect(mapStateToProps, mapDispatchToProps)(SceenB);


const style = StyleSheet.create({
    txt: {
        fontSize: 13, padding: 10, width: "100%"
    },
    btn: { width: 200, height: 48, backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }
});