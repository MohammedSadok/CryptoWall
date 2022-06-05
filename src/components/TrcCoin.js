import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Feather } from "@expo/vector-icons";

import COLORS from "../conts/colors";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function TrcCoin(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  const type =
    props.type == "buy"
      ? {
          name: "arrow-down",
          color: "#19c580",
          backgroundColor: "#baeed9",
        }
      : {
          name: "arrow-up",
          color: "#f5696f",
          backgroundColor: "#fab4b7",
        };

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <View style={[styles.arrow, { backgroundColor: type.color }]}>
          <Feather name={type.name} size={24} color="white" />
        </View>
        <View style={styles.text}>
          <Text style={styles.type}>{props.type}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.qte}>{props.qte + " " + props.symbol}</Text>
        <Text style={[styles.value, { color: type.color }]}>
          ${(props.value * props.qte).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowContainer: {
    flexDirection: "row",
  },
  arrow: {
    borderRadius: 8,
    padding: 7,
    marginRight: "8%",
  },
  text: {
    justifyContent: "space-between",
  },
  valueContainer: {
    marginRight: "3%",
    alignItems: 'baseline'
  },
  value: {
    fontFamily: "Mulish_700Bold",
    fontSize: 12,
    marginTop: "5%",
    alignSelf: "flex-end",
  },
  qte: {
    color: "black",
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  type: {
    textTransform: 'capitalize',
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  date:{
    color: COLORS.grey,
    fontSize: 12,
    marginTop: "5%"
  }
});
