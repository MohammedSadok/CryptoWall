import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import COLORS from "../conts/colors";
import Button from "../components/general/Button";
import Input from "../components/general/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/general/Loader";
import loginF from "../services/login";
import getAllPortfolios from "../services/getAllPortfolios";
import React, { useEffect, useContext } from "react";
import AuthContext from "../context/authoContext";
const LoginScreen = ({ navigation }) => {
  const { setLogin } = useContext(AuthContext);
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      loginUser();
    }
  };

  const loginUser = async () => {
    setLoading(true);
    let userData = await loginF(inputs);
    if (userData.data.success) {
      let temp = await getAllPortfolios(userData.data.user.id);
      const form = {
        Id: userData.data.user.id,
        portfolio: temp[0].id,
        Nom: userData.data.user.Nom,
        Prenom: userData.data.user.Prenom,
        Email: userData.data.user.Email,
        Telephone: userData.data.user.Telephone,
        mot_de_passe: inputs.password,
        loggedIn: true,
      };
      AsyncStorage.setItem("userData", JSON.stringify(form));
      setLogin(true);
    } else {
      Alert.alert("Error", "Username or password is incorrect!");
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/logo_full.png")}
        />
      </View>
      <Loader visible={loading} />
      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginTop: 5 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button
            title="Log In"
            onPress={validate}
            color={COLORS.blue}
            textColor={COLORS.white}
          />
          <Text
            onPress={() => navigation.navigate("RegistrationScreen")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 60,
    width: 300,
    height: 120,
    resizeMode: "stretch",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoginScreen;
