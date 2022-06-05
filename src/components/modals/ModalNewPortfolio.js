import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { BackHandler } from "react-native";
import Input from "../general/Input";
import ModalPoup from "./ModalPoup";
import Button from "../general/Button";
import { Feather } from "@expo/vector-icons";

const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
import COLORS from "../../conts/colors";
export default function ModalNewPortfolio(props) {
  const [inputs, setInputs] = React.useState({ nom: "" });
  const [errors, setErrors] = React.useState({});
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.nom) {
      handleError("Please input Portfolio Name", "nom");
      isValid = false;
    }
    if (isValid) {
      props.submit(inputs.nom)
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
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
            <Text style={styles.title}>Create portfolio</Text>
            <TouchableOpacity onPress={props.handleClick} style={styles.exit}>
              <Feather name={"plus"} size={32} color="rgb(207, 214, 228)" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputText}>
            <Input
              onChangeText={(text) => handleOnchange(text, "nom")}
              onFocus={() => handleError(null, "nom")}
              label="Portfolio name"
              placeholder="Enter your portfolio name..."
              error={errors.nom}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="Create Portfolio"
              color={COLORS.blue}
              textColor={"white"}
              onPress={validate}
            />
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
  inputText: {
    width: vw * 0.8,
    position: "relative",
    top: 10,
  },
  exit: {
    transform: [{ rotate: "45deg" }],
    marginTop: 15,
  },
  btn: {
    width: vw * 0.8,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
  },
});
