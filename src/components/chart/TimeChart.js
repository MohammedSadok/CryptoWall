import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";


export default function TimeChart(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  const timerStyle = props.on ? styles.activeTime : styles.inactiveTime;
  const time = props.on ? styles.timeActive : styles.timeInactive;
  return (
    <TouchableOpacity style={timerStyle} onPress={props.handleClick}>
      <Text style={time}>{props.time} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeActive: {
    fontFamily: "Mulish_700Bold",
    backgroundColor: "#f1f1f1",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: 'black',
  },
  timeInactive: {
    fontFamily: "Mulish_700Bold",
    backgroundColor: "white",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: "gray",
  },
  activeTime: {
    // color: "#617EEA",
    backgroundColor: "#f1f1f1",
    // borderWidth: 3,
    borderRadius: 20,
  },
  inactiveTime: {
    backgroundColor: "white",
    borderColor: 'white',
    borderRadius: 20,
    // borderWidth: 3,

  },
});
