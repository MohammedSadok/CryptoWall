import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,Dimensions } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Feather } from "@expo/vector-icons";
import styles from "./Coin.style"
export default function Coin(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!loaded) {
    return null;
  }

  const stylePercentage =
    props.percentage > 0 ? styles.percentageActive : styles.percentageInactive;
  const name = props.percentage > 0 ? "arrow-up-right" : "arrow-down-left";
  return (
    <TouchableOpacity style={styles.coin} onPress={props.handleClick}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: props.image,
          }}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.id}>{props.symbol}</Text>
        <Text style={styles.name}>{props.id}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>$ {props.price}</Text>
        <View style={stylePercentage}>
          <Feather name={name} size={24} color="white" />
          <Text style={styles.txtper}>{props.percentage.toFixed(3)} %</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}