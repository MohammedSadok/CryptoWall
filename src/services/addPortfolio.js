import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPv4 from "../conts/consts";
export default async function addPortfolio(nom) {
  let user = await AsyncStorage.getItem("userData");
  let id = JSON.parse(user).Id;
  const form = {
    Nom: nom,
    AccountID: id,
  };
  try {
    // make axios post request
    const response = await axios({
      method: "post",
      url: `http://${IPv4}:5000/api/v1/portfolio/create`,
      data: form,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
