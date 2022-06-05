import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LineChart } from "react-native-wagmi-charts";
import { getData } from "../../services/getData";
import TimeChart from "./TimeChart";
import React, { useState, useEffect, useRef } from "react";
const vw = Dimensions.get("window").width;
const vh = Dimensions.get("window").height;
export default function Chart(props) {
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const data = useRef();
  const [squares, setSquares] = useState([
    { id: 1, name: "Day", on: true },
    { id: 2, name: "Week", on: false },
    { id: 3, name: "Month", on: false },
    { id: 4, name: "Year", on: false },
  ]);
  useEffect(() => {
    const fetchMarketData = async () => {
      let arrData = [];
      const str = props.coin.coin.nom.toLowerCase().split(" ").join("-");
      arrData[0] = await getData(1, str);
      arrData[1] = await getData(7, str);
      arrData[2] = await getData(30, str);
      arrData[3] = await getData(365, str);
      setSelectedCoinData(arrData[0]);
      data.current = arrData;
    };
    fetchMarketData();
  }, []);
  const handleClick = (id) =>
    setSquares((prevSquares) => {
      return prevSquares.map((square) => {
        if (square.id === id) {
          setSelectedCoinData(data.current[id - 1]);
          return { ...square, on: true };
        } else {
          return { ...square, on: false };
        }
      });
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      {selectedCoinData ? (
        <>
          <LineChart.Provider data={selectedCoinData}>
            <LineChart width={vw - 30} height={vh * 0.33}>
              <LineChart.Path width={2} />
              <LineChart.CursorCrosshair>
                <LineChart.Tooltip cursorGutter={30} precision={4} />
                <LineChart.Tooltip position="bottom" cursorGutter={10}>
                  <LineChart.DatetimeText />
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
            </LineChart>
          </LineChart.Provider>

          <View style={styles.timeContainer}>
            {squares.map((item) => {
              return (
                <TimeChart
                  key={item.id}
                  time={item.name}
                  on={item.on}
                  handleClick={() => handleClick(item.id)}
                />
              );
            })}
          </View>
        </>
      ) : (
        <View
          style={{
            height: vh * 0.33,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black"></ActivityIndicator>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 50,
  },
  timeContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "relative",
    bottom: 7,
  },
});
