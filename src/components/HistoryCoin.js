import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
export default function HistoryCoin(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.state}>Received</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.value}>0.0068 BTC</Text>
          <Text style={styles.change}>+$68.54</Text>
          <View style={styles.percentageActive}>
            <Feather name={"arrow-up-right"} size={24} color="white" />
            <Text style={styles.txtper}>15.3 %</Text>
          </View>
        </View>
        <Text style={styles.time}>10:43,AUG 27,2019</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 7,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  textContainer: {
    flexDirection: "column",
  },
  priceContainer: {
    width: "81%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  state: {
    fontFamily: "Mulish_700Bold",
    color: "#3DBD86",
  },
  value: {
    fontFamily: "Mulish_700Bold",
    
  },
  change: {
    fontFamily: "Mulish_700Bold",
    color: "black",
    marginLeft: '15%',
    marginRight: '8%',
  },
  time: {
    fontFamily: "Mulish_400Regular",
    color: "#ADADBD",
    fontSize: 10,
    fontWeight: "700",
  },
  img: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },  
  txtper: {
    color: "white",
    paddingLeft: 5,
  },
  percentageActive: {
    fontFamily: "Mulish_400Regular",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#00CB6A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageInactive: {
    fontFamily: "Mulish_400Regular",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#F26666",
    flexDirection: "row",
    alignItems: "center",
  },
});
