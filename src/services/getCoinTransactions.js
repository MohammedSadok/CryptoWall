import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPv4 from "../conts/consts";
export default async function getCoinTransactions(symbol) {
  let user = await AsyncStorage.getItem("userData");
  let portfolio = JSON.parse(user).portfolio;
  let arr = [];
  try {
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/transaction/all/${portfolio}`
    );
    response.data.forEach((element) => {
      if (element.coin.coin.symbol == symbol) {
        const item = {
          qte: element.Qte,
          type: element.Type,
          value: element.Price,
          symbol: element.coin.coin.symbol.slice(0, -4),
          date: new Date(element.Date)
            .toISOString()
            .replace("T", " ")
            .slice(0, -5),
        };
        arr.push(item);
      }
    });
    return arr;
  } catch (error) {
    console.log(error);
  }
}
