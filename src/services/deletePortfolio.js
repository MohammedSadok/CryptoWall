import React from "react";
import axios from "axios";
import IPv4 from "../conts/consts";
export default async function deletePortfolio(id) {
  try {
    // make axios post request
    const response = await axios({
      method: "post",
      url: `http://${IPv4}:5000/api/v1/portfolio/delete/${id}`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
