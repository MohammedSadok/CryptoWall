import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../conts/colors";
import { AntDesign } from "@expo/vector-icons";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function HomeHeader(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      let user = await AsyncStorage.getItem("userData");
      setUser(JSON.parse(user));
    }
    fetchData();
  }, []);
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.imgContainer}>
        <Image style={styles.img} source={require("../assets/user.png")} />
          <View style={styles.settingsContainer}>
            <View style={styles.name}>
              <Text style={styles.lastName}>{user.Nom}</Text>
              <Text style={styles.firstName}>{user.Prenom}</Text>
            </View>
            <TouchableOpacity
              style={{ marginTop: vh * 0.005 }}
              onPress={() => props.navigation.navigate("Profile")}
            >
              <AntDesign name="setting" size={vw * 0.11} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.portfolio}>
        <ImageBackground
          source={require("../assets/bgHome.jpg")}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.total}>Total balance</Text>
            <Text style={styles.value}>{props.data.balance.toFixed(3)}$</Text>
            <Text style={styles.profit}>Profit</Text>
            <Text style={styles.profitValue}>{props.data.profit.toFixed(3)}$</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: vw * 0.75,
  },
  letter: {
    fontFamily: "Mulish_700Bold",
    fontSize: 28,
    color: COLORS.white,
  },
  suitcase: {
    backgroundColor: COLORS.blue,
    width: vw * 0.15,
    height: vw * 0.15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: vw * 0.03,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: vh * 0.003,
  },
  textContainer: {
    marginRight: 20,
    justifyContent: "space-evenly",
    marginLeft: 20,
  },
  portfolio: {
    height: 142,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: "2%",
    flexDirection: "row",
    overflow: "hidden",
  },
  total: {
    fontFamily: "Mulish_400Regular",
    fontSize: 26,
    color: "#fff",
    marginTop: 5,
  },
  value: {
    fontFamily: "Mulish_700Bold",
    fontSize: 32,
    color: "#fff",
    marginBottom: 10,
    height: 38,
  },
  profit: {
    fontFamily: "Mulish_400Regular",
    fontSize: 20,
    color: "#fff",
  },
  profitValue: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: "lightblue",
    borderRadius: 30,
  },
  name: {
    marginLeft: "2%",
  },
  lastName: {
    color: "#4E5154",
    fontFamily: "Mulish_400Regular",
  },
  firstName: {
    fontFamily: "Mulish_700Bold",
    fontSize: 22,
  },
});
