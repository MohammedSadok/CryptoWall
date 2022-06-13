import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import COLORS from "../../conts/colors";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
export default function Portfolio(props) {
  const profit =
    props.balance == 0 || props.profit == 0
      ? 0
      : ((props.profit * 100) / props.balance).toFixed(3);
  const type =
  props.profit >= 0
      ? { name: "caretup", color: COLORS.green }
      : { name: "caretdown", color: COLORS.red };
  const lastDigit1Str = String(props.id).slice(-1);
  const num = Number(lastDigit1Str);
  var randomImages = [
    require("../../assets/imgs/0.jpg"),
    require("../../assets/imgs/1.jpg"),
    require("../../assets/imgs/2.jpg"),
    require("../../assets/imgs/3.jpg"),
    require("../../assets/imgs/4.jpg"),
    require("../../assets/imgs/5.jpg"),
    require("../../assets/imgs/6.jpg"),
    require("../../assets/imgs/7.jpg"),
    require("../../assets/imgs/8.png"),
    require("../../assets/imgs/9.jpg"),
  ];
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const deletePortfolio = () => {
    hideMenu();
    props.toggleDelete();
  };
  const updatePortfolio = () => {
    hideMenu();
  };
  function toggleModal() {
    setModal(!modal);
  }

  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: props.backgroundColor }]}
      onPress={props.toggle}
    >
      <View style={styles.textContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.total}>
          <Text style={styles.textBalance}>Current Balance</Text>
          <Text style={styles.balance}>{props.balance}</Text>
        </View>
        <Text style={styles.textBalance}>Profit</Text>
        <View style={styles.profit}>
          <Text style={styles.profitValue}>{props.profit}</Text>
          <View style={styles.percentage}>
            <AntDesign
              name={type.name}
              size={20}
              color={type.color}
              style={{ position: "relative", top: 0, right: 3 }}
            />
            <Text style={[styles.textPercentage,{color:type.color}]}>{profit}%</Text>
          </View>
        </View>
      </View>
      <AntDesign
        name="checkcircle"
        size={24}
        color={props.backgroundColor}
        style={{
          position: "absolute",
          left: "45%",
          top: "45%",
          zIndex: 2
        }}
      />
      <ImageBackground
        source={randomImages[num]}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
      >
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu} style={styles.settings}>
              <SimpleLineIcons
                name="options-vertical"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={updatePortfolio}>
            <View style={styles.icon}>
              <MaterialIcons name="edit" size={24} color="#494949" />
              <Text style={styles.option}>Edit portfolio</Text>
            </View>
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={deletePortfolio}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color={COLORS.red}
              />
              <Text style={styles.option}>Remove portfolio</Text>
            </View>
          </MenuItem>
        </Menu>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    height: 180,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 3,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  name: {
    fontFamily: "Mulish_700Bold",
    fontSize: 22,
    marginTop: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  total: {
    marginVertical: 12,
  },
  textBalance: {
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
    color: COLORS.grey,
  },
  balance: {
    fontFamily: "Mulish_700Bold",
    fontSize: 28,
  },
  transaction: {
    fontSize: 12,
    color: COLORS.grey,
  },
  profit: {
    marginRight: 40,
    marginBottom: 15,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  percentage: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 2,
  },
  profitValue: {
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
    color: "black",
    width: 100,
    overflow: "hidden",
    height: 20,
  },
  textPercentage: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    marginBottom: 2,
    zIndex: 1,
  },
  option: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    marginLeft: 5,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settings: {
    position: "relative",
    left: 145,
    padding: 10,
  },
});
