import React, { useRef, useMemo, useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { getData } from "../services/getData";
import CustomChart from "../components/CustomChart";
export default function Test() {
  const [dataCoin, setDataCoin] = useState([]);
  useEffect(() => {
    const fetchMarketData = async () => {
      const data = await getData();
      setDataCoin(data);
    };

    fetchMarketData();
  }, []);

  return (
    <View style={styles.container}>
      {dataCoin.length != 0 && (
        <CustomChart
          currentPrice={3000}
          // logoUrl={selectedCoinData.image}
          // name={selectedCoinData.name}
          // symbol={selectedCoinData.symbol}
          // priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
          sparkline={dataCoin}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
