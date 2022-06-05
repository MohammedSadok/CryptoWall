import axios from "axios";
import IPv4 from "../conts/consts";
const formatMarketData = (data) => {
  let formattedData = [];
  let count = 0;
  data.forEach((item) => {
    if (count % 10 === 0) {
      const formattedItem = {
        timestamp: item[0],
        value: item[1],
      };
      formattedData.push(formattedItem);
    }
    count++
  });
  return formattedData;
};
export const getData = async (time,coin) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${time}`
    );
    return formatMarketData(response.data.prices);
  } catch (error) {
    console.log(error.message);
  }
};
