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
import ModalAction from "./modalAction";
export default function ModalSuccess(props) {
  let text =
    props.type == 1
      ? "Congratulations registration was successful"
      : "Error try Again !";
  return (
    <ModalAction visible={props.on}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={props.handleClick}>
            <Image
              source={require("../../../assets/x.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        {props.type == true && (
          <Image
            source={require("../../../assets/success.png")}
            style={{ height: 120, width: 120}}
          />
        )}
        {props.type == false && (
          <Image
            source={require("../../../assets/remove.png")}
            style={{ height: 120, width: 120}}
          />
        )}
      </View>
      <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
        {text}
      </Text>
    </ModalAction>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

//call it from here

// const [visible, setVisible] = React.useState(false);
//   function toggleModal() {
//     setVisible(!visible);
//   }
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ModalSuccess handleClick={() => toggleModal()} on={visible} type={0}/>
//       <Button title="Open Modal" onPress={() => setVisible(true)} />
//     </View>
//   );
