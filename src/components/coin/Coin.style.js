import { StyleSheet, Dimensions } from "react-native";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default StyleSheet.create({
  id: {
    fontSize: 20,
    fontFamily: "Mulish_700Bold",
    color: "black",
    marginBottom: vh * 0.02,
    textTransform: "uppercase",
  },
  name: {
    fontFamily: "Mulish_400Regular",
    fontSize: 16,
    textTransform: "capitalize",
    color: "#5D5C5D",
  },
  title: {
    maxWidth: vw * 0.5,
  },
  priceContainer: {
    marginRight: vw * 0.01,
    display: "flex",
    alignItems: "flex-end",
    flex: 1,
  },
  txtper: {
    color: "white",
    fontFamily: "Mulish_700Bold",
  },
  percentageActive: {
    fontFamily: "Mulish_400Regular",
    borderRadius: 8,
    paddingHorizontal: vw * 0.01,
    paddingVertical: vh * 0.005,
    backgroundColor: "#00CB6A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageInactive: {
    fontFamily: "Mulish_400Regular",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#F26666",
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontFamily: "Mulish_700Bold",
    fontSize: 20,
    marginBottom: "5%",
  },
  coin: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: 100,
  },
  imgContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
});
