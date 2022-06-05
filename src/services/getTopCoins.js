import axios from "axios";

import IPv4 from "../conts/consts";
export default async function getTopCoins() {
  try {
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/coins/favoris`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
