import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthNavigator from "./src/navigation/AuthNavigator";
import PortfolioContext from "./src/context/PortfolioContext";
export default function App() {
  const [portfolio, setPortfolio] = useState();
  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      <View style={styles.container}>
        <AuthNavigator />
      </View>
    </PortfolioContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1", //
  },
});
