import React from "react";
import axios from "axios";
import IPv4 from "../conts/consts";
import getPortfolio from "./getPortfolio";
export default async function getAllPortfolios(id) {
  try {
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/portfolio/${id}`
    );
    let arr = [];
    for await (const element of response.data) {
      let portfolio = await getPortfolio(element.id);
      arr.push({name: element.Nom, ...portfolio });
    }
    return arr;
  } catch (error) {
    console.log(error);
  }
}
