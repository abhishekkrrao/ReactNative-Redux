import React from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { appDimension, fontStyle, appColor, CommonStyle } from "../../../Styles";
import { CustomButton } from "../../CustomModules";

function Footer(props) {

    return (
        <SafeAreaView style={[{ width: "100%", backgroundColor: "#FFF", flexDirection: "row", marginBottom: -30 }]}>

            {/* Detail Screen Footer Items */}

            {props.isDetail && <View style={{ flex: 1, flexDirection: "row", marginBottom: 50, marginTop: 20 }}>
                <View style={{ flex: 1, padding: 5 }}>
                    <CustomButton
                        onPress={props.onClickCart}
                        btnStyle={{ backgroundColor: appColor.black, height: 45, width: "90%", alignSelf: "center" }}
                        textStyle={{ fontSize: appDimension.pixel13, fontFamily: fontStyle.bold }}
                        value='Add to cart'></CustomButton>
                </View>
                <View style={{ flex: 1, padding: 5 }}>
                    <CustomButton
                        onPress={props.onClickBuy}
                        btnStyle={{ backgroundColor: appColor.black, height: 45, width: "90%", alignSelf: "center" }}
                        textStyle={{ fontSize: appDimension.pixel13, fontFamily: fontStyle.bold }}
                        value='Buy Now'></CustomButton>
                </View>
            </View>}

            {/* Cart Screen Footer Items */}

            {props.isCart && <View style={{ flex: 1, marginBottom: 30, marginTop: 20 }}>
                {props.total && <View style={{ width: "100%", flexDirection: "row", paddingBottom: (props.discount && props.bagTotal) ? 0 : 10 }}>
                    <Text style={{
                        flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                        textAlign: "center"
                    }}>{"Total"}</Text>
                    <Text style={{
                        flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                        textAlign: "center"
                    }}>{"$" + props.total}</Text>
                </View>}

                {props.discount && <View style={{ width: "100%", flexDirection: "row", paddingTop: 10 }}>
                    <Text style={{
                        flex: 1, color: appColor.black, fontFamily: fontStyle.bold,
                        textAlign: "center"
                    }}>{"Discount"}</Text>
                    <Text style={{
                        flex: 1, color: appColor.black, fontFamily: fontStyle.bold,
                        textAlign: "center"
                    }}>{"-  $" + props.discount}</Text>
                </View>}

                {props.bagTotal && <View style={{ width: "100%", flexDirection: "row", marginBottom: 20, paddingTop: 10 }}>
                    <Text style={{
                        flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                        textAlign: "center"
                    }}>{"Bag Total"}</Text>
                    <Text style={{
                        flex: 1, color: appColor.mBlack, fontFamily: fontStyle.bold,
                        textAlign: "center"
                    }}>{"$" + props.bagTotal}</Text>
                </View>}


                <CustomButton
                    btnStyle={{ width: "80%", alignSelf: "center" }}
                    onPress={props.checkOutClick}
                    textStyle={{ fontFamily: fontStyle.bold }}
                    value={"Checkout"}>
                </CustomButton>
            </View>}



        </SafeAreaView>
    );
}
export { Footer };