import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import COLORS from "../conts/colors";
import Button from "../components/general/Button";
import Input from "../components/general/Input";
import Loader from "../components/general/Loader";
import AuthContext from "../context/authoContext";
import newAccount from "../services/register";
import getAllPortfolios from "../services/getAllPortfolios";
const RegistrationScreen = ({ navigation }) => {
  const { login, setLogin } = useContext(AuthContext);
  const [inputs, setInputs] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmation: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.firstName) {
      handleError("Please input firstName", "firstName");
      isValid = false;
    }
    if (!inputs.lastName) {
      handleError("Please input lastName", "lastName");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (!inputs.confirmation) {
      handleError("Please confirm your password", "confirmation");
      isValid = false;
    } else if (inputs.password != inputs.confirmation) {
      handleError("password and confirm password do not match", "confirmation");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);
    const userData = await newAccount(inputs);
    if (userData.data.status) {
      let temp = await getAllPortfolios(userData.data.id);
      const form = {
        Id: userData.data.id,
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
      Alert.alert("Error", userData.data.msg);
      setLoading(false);
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
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
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
            onChangeText={(text) => handleOnchange(text, "firstName")}
            onFocus={() => handleError(null, "firstName")}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstName}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "lastName")}
            onFocus={() => handleError(null, "lastName")}
            iconName="account-outline"
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.firstName}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone number"
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            pwd
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "confirmation")}
            onFocus={() => handleError(null, "confirmation")}
            iconName="lock-outline"
            label="Password Confirmation"
            placeholder="Confirm your password"
            error={errors.confirmation}
            password
            pwd
          />
          <Button
            title="Register"
            onPress={validate}
            color={COLORS.blue}
            textColor={COLORS.white}
          />
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
