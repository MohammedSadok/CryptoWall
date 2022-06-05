import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../conts/colors";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function Transaction(props) {
  let type = props.type == "buy" ? "Received" : "Unreceived";
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  const per =
    props.percentage >= 0
      ? { name: "caretup", color: "#00CB6A" }
      : { name: "caretdown", color: "#F26666" };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: props.image,
          }}
        />
      </View>
      <View style={styles.typeContainer}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.qte}>
          {props.qte} {props.symbol}
        </Text>
        <Text style={styles.time}>{props.time}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.value}>${props.value}</Text>
        <Text style={styles.price}>${props.price}</Text>
        <View style={styles.percentage}>
          <AntDesign
            name={per.name}
            size={vw * 0.04}
            color={per.color}
            style={{ position: "relative", top: 2, right: 2 }}
          />
          <Text style={[styles.txtper, { color: per.color }]}>
            {props.percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: vw * 0.95,
    marginVertical: vh * 0.005,
    backgroundColor: COLORS.white,
    padding: vh * 0.012,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
  },
  title: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  price: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    position: "relative",
    top: 3,
  },
  typeContainer: {
    marginRight: vw * 0.15,
    justifyContent: "space-between",
  },
  text: {
    color: COLORS.black,
    fontFamily: "Mulish_400Regular",
    fontSize: 12,
  },
  txtper: {
    fontFamily: "Mulish_700Bold",
    paddingLeft: vw * 0.005,
  },
  img: {
    width: vw * 0.1,
    height: vw * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  percentage: {
    marginRight: vw * 0.05,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: vh * 0.01,
  },
  priceContainer: {
    justifyContent: "space-between",
    // height: vh * 0.08,
    // backgroundColor: "red",
  },
  time: {
    color: "#ADADBD",
    fontFamily: "Mulish_400Regular",
    fontSize: 12,
    marginTop: vh * 0.01,
  },
  qte: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  value: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    position: "relative",
    top: -3,
  },
  qte: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  type: {
    marginBottom: vh * 0.01,
    color: "#00CB6A",
    fontFamily: "Mulish_700Bold",
    fontSize: 12,
  },
  nbr: {
    color: "white",
    fontFamily: "Mulish_700Bold",
    fontSize: 32,
  },
});
