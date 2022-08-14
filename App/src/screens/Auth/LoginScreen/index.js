import React, { useEffect, useState, memo } from "react";
import { SafeAreaView, View, TextInput, Text, StyleSheet } from "react-native";
import { CustomButton } from '../../../CustomModules/index';
import { LocalStorage, mapStateToProps, mapDispatchToProps } from "../../../../Util";
// import { Header } from "../../../Component";
import { connect } from 'react-redux';


const LoginPage = (props) => {
    const [uID, setUID] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
    }, [])

    const clearAll = () => {
        setPassword("");
        setUID("")
    }

    const saveUser = () => {
        LocalStorage.localStorageInstance.storeData("user", { islogin: true })
            .then(() => {
                LocalStorage.localStorageInstance.getData("user")
                    .then((value) => {
                        if (value != null) {
                            clearAll();
                            props.signIn(value);
                            props.setLoggedIn(true);
                        }
                    });
            });
    }

    return (
        <SafeAreaView style={styles.main}>
            {/* <Header props={props}/> */}
            <View style={styles.v1}>
                <Text style={styles.vAB1}>{"UserID*"}</Text>
                <TextInput
                    style={styles.vAB2}
                    onChangeText={(value) => { setUID(value) }}
                    value={uID}></TextInput>
                <Text style={styles.vAB1}>{"Password*"}</Text>
                <TextInput
                    style={styles.vAB2}
                    onChangeText={(value) => { setPassword(value) }}
                    value={password}></TextInput>
                <View style={styles.vAB3}>
                    <CustomButton
                        textStyle={styles.vAB4}
                        value={"Go->"}
                        btnStyle={styles.vABC1}
                        onPress={() => { saveUser(); }}></CustomButton>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: "#FFF" },
    v1: { flex: 1, padding: 20, alignItems: "center", flexDirection: "column" },
    vAB1: { width: "100%", marginTop: 10 },
    vAB2: {
        width: "100%", height: 48, marginTop: 10,
        borderWidth: 1, borderColor: "#CCC", paddingLeft: 20
    },
    vAB3: { width: "100%" },
    vAB4: { fontSize: 16, fontWeight: "900" },
    vABC1: { marginTop: 20, width: 200, alignSelf: "flex-end" },
    vABC2: {},
    vABC3: {},
})