import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IPv4 from "../conts/consts";
export default async function getAllTransactions() {
  let user = await AsyncStorage.getItem("userData");
  let portfolio = JSON.parse(user).portfolio;
  try {
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/transaction/all/${portfolio}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
