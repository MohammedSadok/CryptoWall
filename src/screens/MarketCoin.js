import React, { useState, useEffect, useContext } from "react";
import addTransaction from "../services/addTransaction";
import getCoinTransactions from "../services/getCoinTransactions";
import Chart from "../components/chart/Chart";
import ModalBuy from "../components/modals/ModalBuy";
import Loader from "../components/general/Loader";
import ModalSuccess from "../components/modals/mdls/modelSuccess";
import PortfolioContext from "../context/PortfolioContext";
import TrcCoin from "../components/TrcCoin";
import getCoin from "../services/getCoin";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  Image,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import COLORS from "../conts/colors";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function MarketCoin({ navigation, route }) {
  const { id, nav, price } = route.params;
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const [coin, setCoin] = useState(null);
  const [data, setData] = useState([]);
  const [per, setPer] = useState({
    nom: "caretup",
    color: "#00CB6A",
  });
  const [modal, setModal] = useState({
    modelResult: false,
    isModelResultVisible: false,
    modelType: "",
    isModalTypeVisible: false,
    loading: false,
  });

  useEffect(() => {
    const loadApi = async (id) => {
      toggleLoading();
      const response = await getCoin(id);
      const res = await getCoinTransactions(id);
      setData(res);
      setCoin(response);
      toggleLoading();
      if (res.pourcentage < 0) {
        setPer({
          nom: "caretdown",
          color: "#00CB6A",
        });
      }
    };
    loadApi(id);
  }, []);
  function toggleModal(type, show) {
    setModal((prev) => ({
      ...prev,
      modelType: type,
      isModalTypeVisible: show,
    }));
  }
  function toggleModalResult(type, show) {
    setModal((prev) => ({
      ...prev,
      modelResult: type,
      isModelResultVisible: show,
      loading: false,
    }));
  }
  function toggleLoading() {
    setModal((prev) => ({
      ...prev,
      loading: !prev.loading,
    }));
  }
  const renderItem = ({ item, index }) => {
    return (
      <TrcCoin
        key={index}
        qte={item.qte}
        type={item.type}
        value={item.value}
        symbol={item.symbol}
        date={item.date}
      />
    );
  };
  const validate = async (data) => {
    const form = {
      Nom: "",
      Type: modal.modelType,
      Qte: data.qte,
      Price: data.price,
      PortFolioID: portfolio.id,
      coin: id,
    };
    toggleLoading();
    let rep = await addTransaction(form);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setData((oldArray) => [
      ...oldArray,
      {
        qte: form.Qte,
        type: form.Type,
        value: form.Price,
        symbol: form.coin.slice(0, -4),
        date: date + " " + time,
      },
    ]);
    let profit = portfolio.profit;
    profit +=
      form.Type == "sell"
        ? form.Price * form.Qte - price * form.Qte
        : price * form.Qte - form.Price * form.Qte;

    let balance = portfolio.balance;
    balance += form.Type == "sell" ? -price * form.Qte : +price * form.Qte;
    setPortfolio({
      ...portfolio,
      balance: balance,
      profit: profit,
    });
    toggleModalResult(rep.data.status, true);
  };
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  } else if (modal.loading) {
    return <Loader visible={modal.loading} />;
  } else
    return (
      <Modal visible={true}>
        <View style={styles.container}>
          {coin != undefined && (
            <View style={styles.header}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Market")}>
                  <AntDesign name="arrowleft" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Statistic</Text>
              </View>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={{
                    uri: coin.coin.icon,
                  }}
                />
                <Text style={styles.name}>
                  {coin.coin.nom}({coin.coin.symbol.slice(0, -4)})
                </Text>
                <Text style={styles.price}>${coin.coin.price}</Text>
                <View style={styles.percentage}>
                  <AntDesign
                    style={{ paddingTop: 2 }}
                    name={per.nom}
                    size={vw * 0.05}
                    color={per.color}
                  />
                  <Text style={styles.txtper}>{coin.pourcentage}%</Text>
                </View>
              </View>
            </View>
          )}
          {coin != undefined && (
            <View style={styles.chart}>
              <Chart coin={coin} />
            </View>
          )}
          <View style={styles.list}>
            <Text style={styles.history}>History</Text>
            {data.length > 0 && (
              <FlatList data={data} renderItem={renderItem} />
            )}
            {!data.length && (
              <View style={styles.list}>
                <Text style={styles.emptyText}>
                  You do not have any Transaction !
                </Text>
              </View>
            )}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnSell}
                onPress={() => toggleModal("sell", true)}
              >
                <Text style={styles.textSell}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnBuy}
                onPress={() => toggleModal("buy", true)}
              >
                <Text style={styles.textBuy}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {modal.isModalTypeVisible && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <ModalBuy
              backdropOpacity={0.2}
              handleClick={() => toggleModal(modal.modelType)}
              on={modal.isModalTypeVisible}
              type={modal.modelType}
              submit={validate}
              price={coin.coin.price}
            />
          </View>
        )}
        {modal.isModelResultVisible && (
          <ModalSuccess
            handleClick={() =>
              setModal((prev) => ({
                ...prev,
                isModalTypeVisible: false,
                isModelResultVisible: false,
              }))
            }
            on={1}
            type={modal.modelResult}
          />
        )}
      </Modal>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f4",
  },
  header: {
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "space-around",
    marginBottom: 5,
  },
  list: {
    flex: 1,
    marginHorizontal: 10,
  },
  chart: {
    flex: 0.9,
    borderRadius: 50,
  },
  title: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
    marginLeft: "30%",
  },
  btnContainer: {
    marginBottom: 10,
    height: 50,
    width: "100%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imgContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  history: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
    marginBottom: 5,
  },
  btnSell: {
    backgroundColor: "white",
    padding: "3.3%",
    paddingHorizontal: "17%",
    borderRadius: 14,
    borderColor: "#e16f6f",
    borderWidth: 1,
  },
  btnBuy: {
    backgroundColor: "#1573fe",
    padding: "3.3%",
    paddingHorizontal: "17%",
    borderRadius: 14,
  },
  textSell: {
    marginTop: "1%",
    fontFamily: "Mulish_700Bold",
    color: "#e16f6f",
    fontSize: 16,
  },
  textBuy: {
    color: "white",
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  img: {
    width: vh * 0.12,
    height: vh * 0.12,
  },
  name: {
    fontFamily: "Mulish_400Regular",
    color: COLORS.grey,
    fontSize: 16,
  },
  price: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
    letterSpacing: 1.2,
  },
  txtper: {
    color: "#00CB6A",
    paddingLeft: "1%",
    letterSpacing: 1,
  },
  percentage: {
    fontFamily: "Mulish_400Regular",
    flexDirection: "row",
  },
});
