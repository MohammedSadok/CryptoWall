import axios from "axios";
import IPv4 from "../conts/consts";
export default async function (id) {
  try {
    // make axios get request
    const response = await axios.get(
      `http://${IPv4}:5000/api/v1/coins/symbol/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
