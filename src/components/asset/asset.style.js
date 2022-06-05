import { StyleSheet, Dimensions } from "react-native";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default StyleSheet.create({
  title: {
    height: "100%",
    justifyContent: "space-around",
    marginLeft: '4%',
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "space-around",
    flex: 1,
    marginRight: "3%",
    height: "100%",
  },
  txtper: {
    color: "white",
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  percentage: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontFamily: "Mulish_700Bold",
    fontSize: 20,
    width: 150,
    height: 23,
    textAlign: "right",
  },
  container: {
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: 75,
    // width: "maxContent"
  },
  img: {
    width: 40,
    height: 40,
    marginLeft: "2%",
  },
  name: {
    fontFamily: "Mulish_400Regular",
    textTransform: "capitalize",
    color: "black",
    fontSize: 16,
    width: "80%",
    height: 20
  },
  value: {
    fontFamily: "Mulish_700Bold",
    textTransform: "capitalize",
    color: "black",
    fontSize: 16,
    width: 150,
    height: 20
  },
});
