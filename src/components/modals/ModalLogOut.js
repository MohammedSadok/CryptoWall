import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { BackHandler } from "react-native";
import ModalPoup from "./ModalPoup";
import Button from "../general/Button";
import { Feather } from "@expo/vector-icons";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function ModalLogOut(props) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ModalPoup visible={props.on}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={props.handleCancel} style={styles.exit}>
              <Feather name={"plus"} size={32} color="rgb(207, 214, 228)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{props.text}</Text>
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <Button
                title={props.btn}
                color={"#ea3943"}
                textColor={"white"}
                onPress={props.handleClick}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Cancel"
                color={"#eff2f5"}
                textColor={"black"}
                onPress={props.handleCancel}
              />
            </View>
          </View>
        </View>
      </ModalPoup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: vh * 0.2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  header: {
    marginHorizontal: vw * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: vw * 0.8,
  },
  exit: {
    transform: [{ rotate: "45deg" }],
    marginTop: 15,
  },
  btn: {
    width: "35%",
    marginHorizontal: 20,
  },
  btnContainer: {
    flexDirection: "row",
    position: "relative",
    top: -10,
  },
  title: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
  },
  text: {
    fontFamily: "Mulish_400Regular",
    fontSize: 16,
    marginVertical: vh * 0.03,
    alignSelf: "flex-start",
    marginLeft: vw * 0.07,
    width: vw * 0.75,
  },
});
