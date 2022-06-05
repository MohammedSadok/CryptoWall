import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import COLORS from "../../conts/colors";
import ModalPoup from "./ModalPoup";
import Input from "../general/Input";
import Button from "../general/Button";
import { Feather } from "@expo/vector-icons";
export default function ModalBuy(props) {
  const [inputs, setInputs] = React.useState({ qte: 0, price: props.price });
  const [errors, setErrors] = React.useState({});
  const text = props.type == "buy" ? "Total Spent" : "Total";
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.qte) {
      handleError("Please input quantity", "qte");
      isValid = false;
    }
    if (!inputs.price) {
      handleError("Please input price", "price");
      isValid = false;
    }
    if (isValid) {
      props.submit(inputs);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <KeyboardAvoidingView>
      <ModalPoup visible={props.on}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={props.handleClick} style={styles.exit}>
              <Feather name={"plus"} size={32} color="rgb(207, 214, 228)" />
            </TouchableOpacity>
          </View>
          <Input
            style={styles.inputText}
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "qte")}
            onFocus={() => handleError(null, "qte")}
            placeholder="0.00"
            label="Quantity"
            error={errors.qte}
          />
          <Input
            style={styles.inputText}
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "price")}
            onFocus={() => handleError(null, "price")}
            label="Price Per Coin"
            error={errors.price}
            value={inputs.price+""}
          />
          <View style={styles.total}>
            <Text style={styles.label}>{text}</Text>
            <Text style={styles.value}>
              {(inputs.qte * inputs.price).toFixed(2)}$
            </Text>
          </View>
          <View style={styles.btn}>
            <Button
              title="Add Transaction"
              onPress={validate}
              color={COLORS.blue}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </ModalPoup>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  inputText: {
    width: "80%",
  },
  header: {
    alignSelf: "flex-end",
    marginRight: 25,
  },
  exit: {
    transform: [{ rotate: "45deg" }],
    marginTop: 15,
  },
  total: {
    backgroundColor: "#f1f1f1",
    width: "85%",
    marginVertical: "5%",
    padding: "5%",
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
  },
  btn: {
    width: "85%",
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
