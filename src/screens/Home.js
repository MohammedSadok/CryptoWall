import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Asset from "../components/asset/Asset";
import HomeHeader from "../components/HomeHeader";
import TrendCoin from "../components/trendCoin/TrendCoin";
import getAssets from "../services/getAssets";
import getTopCoins from "../services/getTopCoins";
import getPortfolio from "../services/getPortfolio";
import PortfolioContext from "../context/PortfolioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [assets, setAssets] = useState([]);
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  async function fetchData() {
    let user = await AsyncStorage.getItem("userData");
    let res = await getPortfolio(JSON.parse(user).portfolio);
    setPortfolio(res);
    let response = await getAssets(JSON.parse(user).portfolio);
    let Top = await getTopCoins();
    setAssets(Top);
    setData(response);
  }
  async function fetchDataAssets() {
    let response = await getAssets(portfolio.id);
    setData(response);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (portfolio != undefined) fetchDataAssets();
  }, [portfolio]);
  const renderItem = ({ item }) => {
    return (
      <TrendCoin
        key={item.id}
        symbol={item.coin.symbol.slice(0, -4)}
        value={item.coin.price}
        image={item.coin.icon}
        handleClick={() => {
          navigation.navigate("MarketCoin", {
            id: item.coin.symbol,
            price: item.coin.price,
            nav: "Home",
          });
        }}
      />
    );
  };
  const renderAsset = ({ item }) => {
    return (
      <Asset
        key={item.coin.coinID}
        image={item.coin.icon}
        symbol={item.coin.symbol.slice(0, -4)}
        id={item.coin.nom}
        price={(item.qte * item.coin.price).toFixed(3)}
        qte={item.qte}
        profit={item.profit}
        percentage={item.price_change_percentage_24h}
        handleClick={() => {
          navigation.navigate("MarketCoin", {
            id: item.coin.symbol,
            price: item.coin.price,
            nav: "Home",
          });
        }}
      />
    );
  };

  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {portfolio && <HomeHeader navigation={navigation} data={portfolio} />}
      </View>
      <View style={styles.assets}>
        <View style={styles.textContainer}>
          <Text style={styles.yourAssets}>Top 10</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={assets}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={styles.textWatchList}>Your Assets</Text>
      <FlatList style={styles.watchList} data={data} renderItem={renderAsset} />
      {!data.length && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You do not have any Asset !
            </Text>
          </View>
        )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1", //
    marginHorizontal: 10,
    marginTop: 40,
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  yourAssets: {
    fontFamily: "Mulish_400Regular",
    fontSize: 16,
    marginTop: 5,
  },
  seeAll: {
    fontFamily: "Mulish_700Bold",
    textDecorationLine: "underline",
    color: "#4568dc",
    marginTop: 5,
  },
  header: {
    height: 200,
  },
  assets: {
    height: 160,
  },
  textWatchList: {
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  emptyText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 20,
  },
});
