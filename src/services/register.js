import IPv4 from "../conts/consts";
import axios from "axios";
export default async function newAccount(data) {
  const form = {
    Nom: data.lastName,
    Prenom: data.firstName,
    Email: data.email,
    Telephone: data.phone,
    mot_de_passe: data.password,
  };
  try {
    // make axios post request
    const response = await axios({
      method: "post",
      url: `http://${IPv4}:5000/api/v1/register`,
      data: form,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
