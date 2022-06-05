import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../../../conts/colors";
import { useEffect, useState } from "react";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function Item(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={props.handleClick}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.img, { backgroundColor: props.color, padding: "5%" }]}
        >
          <Image
            source={props.image}
            style={{ height: props.height, width: props.width }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
      <Entypo name="chevron-right" size={32} color="#130F26" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: "2.5%",
    borderRadius: 10,
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
  title: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  text: {
    color: COLORS.black,
    fontFamily: "Mulish_400Regular",
    fontSize: 12,
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: vw * 0.04,
  },
  nbr: {
    color: "white",
    fontFamily: "Mulish_700Bold",
    fontSize: 32,
  },
  textContainer: {
    justifyContent: "space-around",
  },
});
