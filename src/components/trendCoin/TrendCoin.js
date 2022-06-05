import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import styles from "./Asset.style"
export default function TrendCoin(props) {
  let [fontsLoaded] = useFonts({
    Mulish_700Bold,
    Mulish_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: props.image,
        }}
      />
      <Text style={styles.name}>{props.symbol}</Text>
      <Text style={styles.price}>${props.value}</Text>
    </View>
  );
}

