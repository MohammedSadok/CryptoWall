import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigation from "./src/navigation/mainNavigation";
import PortfolioContext from "./src/context/PortfolioContext";
import AuthContext from "./src/context/authoContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const [portfolio, setPortfolio] = useState();
  const [login, setLogin] = useState(-1);
  useEffect(() => {
    const authUser = async () => {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } else {
        setLogin(false);
      }
    };
    authUser();
  }, []);
  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
        <View style={styles.container}>
          {login === true ? <MainNavigation /> : <AuthNavigator />}
        </View>
      </PortfolioContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1", //
  },
});
