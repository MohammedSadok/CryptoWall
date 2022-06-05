import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/phone.png")} />
      <View style={styles.container_text}>
        <Text style={styles.first_text}>Your personal cryto wallet</Text>
        <Text style={styles.second_text}>
          Its secure and support near about hundred cryto currencies
        </Text>
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RegistrationScreen")}>
            <Text style={styles.btn_start}>Get Started</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2AA7E9",
  },
  container_text: {
    paddingHorizontal: 20,
  },
  first_text: {
    color: "white",
    fontStyle: "normal",
    fontSize: 36,
    fontWeight: "600",
    lineHeight: 40,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  second_text: {
    color: "white",
    fontStyle: "normal",
    fontSize: 18,
    fontWeight: "normal",
    lineHeight: 21,
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  img: {
    width: 469,
    height: 469,
    transform: [{ scaleX: -1 }, { scaleY: 1 }],
    marginLeft: 30,
  },
  btn: {
    marginTop: "20%",
    width: 347,
    height: 52,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn_start: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
});
