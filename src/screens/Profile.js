import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Item from "../components/profile/settings/item";
import ModalLogOut from "../components/modals/ModalLogOut";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Updates } from "expo";
import COLORS from "../conts/colors";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
import PortfolioContext from "../context/PortfolioContext.js";
import AuthContext from "../context/authoContext";
export default function Profile({ navigation, route }) {
  const { portfolio } = useContext(PortfolioContext);
  const { login, setLogin } = useContext(AuthContext);
  const randomImages = [
    require("../assets/imgs/0.jpg"),
    require("../assets/imgs/1.jpg"),
    require("../assets/imgs/2.jpg"),
    require("../assets/imgs/3.jpg"),
    require("../assets/imgs/4.jpg"),
    require("../assets/imgs/5.jpg"),
    require("../assets/imgs/6.jpg"),
    require("../assets/imgs/7.jpg"),
    require("../assets/imgs/8.png"),
    require("../assets/imgs/9.jpg"),
  ];
  const Percentage =
    portfolio.balance == 0 || portfolio.profit == 0
      ? 0
      : ((portfolio.profit * 100) / portfolio.balance).toFixed(3);
  const type =
    portfolio.profit >= 0
      ? { name: "caretup", color: COLORS.green }
      : { name: "caretdown", color: COLORS.red };
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      let user = await AsyncStorage.getItem("userData");
      setUser(JSON.parse(user));
    }
    fetchData();
  }, []);

  function toggleModal() {
    setModal(!modal);
  }
  const logOut = async () => {
    let userData = await AsyncStorage.getItem("userData");
    userData = JSON.parse(userData);
    userData.loggedIn = false;
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    setLogin(false);
  };
  if (modal) {
    return (
      <ModalLogOut
        backdropOpacity={0.2}
        handleCancel={() => toggleModal()}
        handleClick={logOut}
        on={modal}
        title={"Confirm Logout"}
        text={"Are you sure you want to Logout ?"}
        btn={"Ok"}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.containerImg}>
          <Image style={styles.img} source={require("../assets/user.png")} />
          <TouchableOpacity
            style={styles.img2}
            onPress={() => {
              console.log("hello");
            }}
          >
            <Image
              source={require("../assets/modifier.png")}
              style={{ height: vh * 0.05, width: vh * 0.05 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.Prenom + " " + user.Nom}</Text>
      </View>
      <View style={styles.total}>
        <View style={styles.totalContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Current Balance</Text>
            <Text style={styles.nbr}>{portfolio.balance.toFixed(2)}$</Text>
          </View>
          <View style={styles.profit}>
            <Text style={styles.profitText}>Profit</Text>
            <Text style={styles.profitValue}>
              {portfolio.profit.toFixed(2)}$
            </Text>
            <View style={styles.percentageContainer}>
              <AntDesign
                name={type.name}
                size={16}
                color={type.color}
              />
              <Text style={[styles.percentage,{color:type.color}]}>{Percentage}%</Text>
            </View>
          </View>
        </View>
        <ImageBackground
          source={randomImages[String(portfolio.id).slice(-1)]}
          resizeMode="cover"
          style={{ flex: 1 }}
          imageStyle={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
        ></ImageBackground>
      </View>
      <View style={styles.transaction}>
        <Item
          title={"Transaction List"}
          text={"Transactions You Have"}
          image={require("../assets/Image1.png")}
          width={17}
          height={20}
          color={"#E0FFF0"}
          handleClick={() => navigation.navigate("Transactions")}
        />
      </View>

      <View style={styles.list}>
        <Text style={styles.title}>Settings</Text>
        <Item
          title={"Privacy"}
          text={"Change email and password"}
          image={require("../assets/private.png")}
          width={17}
          height={20}
          color={"#E0FDFF"}
        />
        <Item
          title={"Portfolio"}
          text={"Update portfolio settings"}
          image={require("../assets/protfolio.png")}
          width={20}
          height={18}
          color={"#F1E0FF"}
          handleClick={() => navigation.navigate("PortfolioScreen")}
        />
        <Item
          title={"Notifications"}
          text={"Change notification settings"}
          image={require("../assets/notification.png")}
          width={17}
          height={20}
          color={"#FFFCE0"}
        />
        <View style={{ marginTop: "2%" }}>
          <Item
            title={"Go out"}
            text={"Exit the app"}
            image={require("../assets/logout.png")}
            width={21}
            height={21}
            color={"#FFE0E0"}
            handleClick={() => toggleModal()}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  containerImg: {
    marginLeft: "12%",
    flexDirection: "row",
  },
  letter: {
    fontFamily: "Mulish_700Bold",
    fontSize: 42,
    color: COLORS.white,
  },
  suitcase: {
    backgroundColor: COLORS.blue,
    width: vh * 0.14,
    height: vh * 0.14,
    borderRadius: vh * 0.14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
  },
  header: {
    flex: 1.5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  list: {
    flex: 2.8,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  total: {
    flex: 1.85,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  totalContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  imgTotal: {
    resizeMode: "cover",
  },
  transaction: {
    flex: 0.5,
    marginVertical: "3%",
  },
  img: {
    width: 120,
    height: 120,
  },
  img2: {
    position: "relative",
    top: 75,
    right: 30,
  },
  name: {
    fontSize: 24,
    fontFamily: "Mulish_700Bold",
  },
  title: {
    marginHorizontal: "5%",
  },
  text: {
    fontFamily: "Mulish_700Bold",
    color: COLORS.grey,
    fontSize: 18,
  },
  nbr: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 28,
    height: 30,
  },
  textContainer: {
    paddingLeft: "10%",
  },
  profit: {
    paddingLeft: "10%",
  },
  profitText: {
    color: COLORS.grey,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  profitValue: {
    color: COLORS.black,
    fontFamily: "Mulish_700Bold",
    fontSize: 20,
    marginRight: "6%",
    height: 22,
  },
  value_text: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageContainer: {
    marginTop: "9%",
    flexDirection: "row",
    alignItems: "baseline",
  },
  percentage: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    marginLeft: "5%",
    height: 16,
  },
});
