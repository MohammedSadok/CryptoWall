import axios from "axios";

import IPv4 from "../conts/consts";
export default async function getPortfolio(id) {
  try {
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/transaction/all/${id}`
    );
    let portfolio = {
      id: id,
      balance: 0,
      profit: 0,
    };
    response.data.forEach((element) => {
      portfolio.profit +=
        element.Type == "sell"
          ? element.Price * element.Qte - element.coin.coin.price * element.Qte
          : element.coin.coin.price * element.Qte - element.Price * element.Qte;

      portfolio.balance +=
        element.Type == "sell"
          ? -element.coin.coin.price * element.Qte
          : +element.coin.coin.price * element.Qte;
    });
    return portfolio;
  } catch (error) {
    console.log(error);
  }
}
