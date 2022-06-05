import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    width: 130,
    borderRadius: 7,
    marginRight: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: "Mulish_400Regular",
    color: "#4d4d4d",
  },
  price: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    width: '80%',
    height: 20,
    textAlign: "center"
  },
});
