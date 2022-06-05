import IPv4 from "../conts/consts";
import axios from "axios";
export default async function loginF(data) {
  const form = {
    "Email": data.email,
    "mot_de_passe": data.password
}
  try {
    // make axios post request
    const response = await axios({
      method: "post",
      url: `http://${IPv4}:5000/api/v1/login`,
      data: form,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
