import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import Transaction from "../components/Transaction";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import getAllTransactions from "../services/getAllTrsnsactions";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function Transactions({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function loadApi() {
    const response = await getAllTransactions();
    setData(response);
  }
  function sort() {
    const sorted = [...data].sort((a, b) => {
      return b.coin.coin.symbol > a.coin.coin.symbol ? -1 : 1;
    });
    setData(sorted);
  }
  useEffect(function () {
    loadApi();
  }, []);
  const renderItem = ({ item }) => {
    let profit =
      item.Type == "sell"
        ? item.Price * item.Qte - item.coin.coin.price * item.Qte
        : item.coin.coin.price * item.Qte - item.Price * item.Qte;
    return (
      <Transaction
        image={item.coin.coin.icon}
        qte={item.Qte}
        type={item.coin.Type}
        time={new Date(item.Date).toISOString().replace("T", " ").slice(0, -5)}
        price={item.coin.coin.price}
        value={item.Price}
        percentage={(profit * 100) / item.coin.coin.price}
        symbol={item.coin.coin.symbol.slice(0, -4)}
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
    <Modal transparent={true} visible={true}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <AntDesign name="arrowleft" size={32} color="black" />
          </TouchableOpacity>
          <Text style={styles.history}>History</Text>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={sort}>
            <MaterialCommunityIcons name="sort" size={24} color="black" />
            <Text style={styles.sort}>Sort/Filter</Text>
          </TouchableOpacity>
        </View>
        {data.length > 0 && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshing={loading}
            onRefresh={loadApi}
          />
        )}
        {!data.length && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You do not have any Transaction !
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emptyText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 20,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f1f1f1", //
    paddingLeft: 10,
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    // marginBottom: 5,
  },
  history: {
    fontFamily: "Mulish_700Bold",
    fontSize: 32,
    marginRight: vw * 0.25,
  },
  sort: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    marginLeft: 5,
  },
});
