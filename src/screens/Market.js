import React from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
const ViewTypes = {
  FULL: 0,
};
import IPv4 from "../conts/consts"
import Coin from "../components/coin/Coin";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
export default function Market({ navigation }) {
  let { width } = Dimensions.get("window");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  let dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });
  async function loadApi() {
    const response = await axios.get(`http://${IPv4}:5000/api/v1/coins`);
    setData([...data, ...response.data]);
    setFilterData([...data, ...response.data]);
  }
  let setProvider = dataProvider.cloneWithRows(filterData);
  useEffect(function () {
    loadApi();
    const interval = setInterval(() => {
      loadApi();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  let _layoutProvider = new LayoutProvider(
    (index) => {
      return ViewTypes.FULL;
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.FULL:
          dim.width = width;
          dim.height = 110;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.coin.nom ? item.coin.nom.toUpperCase() : "".toUpperCase();
        const TextData = text.toUpperCase();
        return itemData.indexOf(TextData) > -1;
      });
      setSearch(text);
      setFilterData(newData);
    } else {
      setSearch(text);
      setFilterData(data);
    }
  };
  function _rowRenderer(type, data) {
    switch (type) {
      case ViewTypes.FULL:
        return (
          <Coin
            key={data.coin.coinID}
            image={data.coin.icon}
            symbol={data.coin.nom}
            id={data.coin.symbol}
            price={data.coin.price}
            percentage={data.percentage}
            handleClick={() => {
              navigation.navigate("MarketCoin", {
                id: data.coin.symbol,
                nav: "Home",
              });
            }}
          />
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search. . ."
          style={styles.search}
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
        <Feather name="search" size={20} color="gray" />
      </View>
      {setProvider._data.length > 0 && (
        <RecyclerListView
          layoutProvider={_layoutProvider}
          dataProvider={setProvider}
          rowRenderer={_rowRenderer}
        />
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
  },
  coinsContainer: {
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#F1F1F1",
    display: "flex",
    flexDirection: "column",
  },

  searchBar: {
    height: 40,
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
  },
  search: {
    flex: 1,
  },
  loading: {
    padding: 10,
  },
});
