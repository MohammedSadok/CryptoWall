import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../../conts/colors";
import styles from "./asset.style";
export default function Asset(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!loaded) {
    return null;
  }
  const percentage =
    props.profit >= 0
      ? { name: "caretup", color: COLORS.green }
      : { name: "caretdown", color: COLORS.red };
  return (
    <TouchableOpacity style={styles.container} onPress={props.handleClick}>
      <Image
        style={styles.img}
        source={{
          uri: props.image,
        }}
      />
      <View style={styles.title}>
        <Text style={styles.name}>
          {props.id}({props.symbol})
        </Text>
        <Text style={styles.value}>{props.qte}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${props.price}</Text>
        <View style={styles.percentage}>
          <AntDesign
            name={percentage.name}
            size={16}
            color={percentage.color}
            style={{
              position: "relative",
              top: props.profit > 0 ? 2 : 0,
              right: 3,
            }}
          />
          <Text style={[styles.txtper, { color: percentage.color }]}>
            {Math.abs(((props.profit * 100) / props.price).toFixed(3))}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
