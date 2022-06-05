import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Transactions from "../screens/Transactions";
import PortfolioScreen from "../screens/PortfolioScreen";
const Stack = createNativeStackNavigator();
export default function () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"Profile"}>
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PortfolioScreen"
          component={PortfolioScreen}
          options={{ headerShown: false}}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
