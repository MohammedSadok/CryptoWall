import IPv4 from "../conts/consts";
import axios from "axios";
export default async function getAssets(id) {
  try {
    let assetsMap = new Map();
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/transaction/all/${id}`
    );
    response.data.forEach((element) => {
      let qte = element.Type == "sell" ? -element.Qte : element.Qte;
      let profit =
        element.Type == "sell"
          ? element.Price * element.Qte - element.coin.coin.price * element.Qte
          : element.coin.coin.price * element.Qte - element.Price * element.Qte;
      let asset = {
        qte: qte,
        price: element.Price,
        coin: element.coin.coin,
        profit: profit,
      };
      if (!assetsMap.has(element.coin.coin.symbol)) {
        assetsMap.set(element.coin.coin.symbol, asset);
      } else {
        let temp = assetsMap.get(element.coin.coin.symbol);
        temp.qte += asset.qte;
        temp.price += asset.price;
        temp.profit += asset.profit;
        assetsMap.set(element.coin.coin.symbol, temp);
      }
    });
    let arr = [];
    for (const [key, value] of assetsMap) {
      arr.push(value);
    }
    return arr;
  } catch (error) {
    console.log(error);
  }
}
