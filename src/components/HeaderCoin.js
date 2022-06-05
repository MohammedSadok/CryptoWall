import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function Header(props, { navigation }) {
  const per =
    props.percentage > 0
      ? { name: "caretup", color: "#00CB6A" }
      : { name: "caretdown", color: "" };
  const ganContainer =
    props.percentage > 0 ? styles.ganActive : styles.ganInactive;
  const name =
    props.coin.pourcentage > 0 ? "arrow-up-right" : "arrow-down-left";
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: props.coin.coin.icon,
            }}
          />
          <Text style={styles.coinName}>
            {props.coin.coin.nom.toUpperCase()}
          </Text>
        </View>
        <View style={styles.percentage}>
          <AntDesign name={per.name} size={vw * 0.05} color={"#00CB6A"} />
          <Text style={styles.txtper}>{1.002}%</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.total}>4000$</Text>
        <Text style={styles.value}>
          1.05 {props.coin.coin.symbol.slice(0, -4)}
        </Text>
        <View style={ganContainer}>
          <Text style={styles.gan}>{props.coin.pourcentage}</Text>
          {/* <Text style={styles.txtper}>{props.percentage.toFixed(2)} %</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vh * 0.015,
    paddingHorizontal: vw * 0.02,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  percentage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: vw * 0.23,
  },
  txtper: {
    color: "#00CB6A",
    paddingLeft: vw * 0.01,
    fontSize: 18,
  },
  img: {
    width: vw * 0.13,
    height: vw * 0.13,
    marginRight: vw * 0.03,
  },
  imgContainer: {
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  priceContainer: {
    marginHorizontal: vw * 0.02,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  total: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
  },
  value: {
    color: "black",
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    marginRight: vw * 0.2,
  },
  gan: {
    color: "white",
    paddingLeft: vw * 0.01,
    fontFamily: "Mulish_400Regular",
    fontSize: 18,
  },
  coinName: {
    color: "black",
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
  },
  ganActive: {
    fontFamily: "Mulish_400Regular",
    borderRadius: 8,
    paddingHorizontal: vw * 0.01,
    paddingVertical: vh * 0.005,
    backgroundColor: "#00CB6A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ganInactive: {
    fontFamily: "Mulish_400Regular",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#F26666",
    flexDirection: "row",
    alignItems: "center",
  },
});
