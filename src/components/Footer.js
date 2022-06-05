import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import ModalBuy from "./modals/ModalBuy";
export default function Footer(props) {
  const [isModalVisible, setModalVisible] = useState({
    buy: false,
    sell: false,
  });
  function toggleModal(type) {
    setModalVisible((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  }
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ModalBuy
        handleClick={() => toggleModal("buy")}
        on={isModalVisible.buy}
        type={"buy"}
        text={"Total Spent"}
      />
      <ModalBuy
        handleClick={() => toggleModal("sell")}
        on={isModalVisible.sell}
        type={"sell"}
        text={"Total Received"}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnSell}
          onPress={() => toggleModal("sell")}
        >
          <Text style={styles.textSell}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnBuy}
          onPress={() => toggleModal("buy")}
        >
          <Text style={styles.textBuy}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  btnSell: {
    backgroundColor: "white",
    padding: 15,
    paddingHorizontal: 65,
    borderRadius: 14,
    borderColor: "#e16f6f",
    borderWidth: 1,
  },
  btnBuy: {
    backgroundColor: "#6983fd",
    padding: 15,
    paddingHorizontal: 65,
    borderRadius: 14,
  },
  textSell: {
    fontFamily: "Mulish_700Bold",
    color: "#e16f6f",
  },
  textBuy: {
    color: "white",
    fontFamily: "Mulish_700Bold",
  },
});
