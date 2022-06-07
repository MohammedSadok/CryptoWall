import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Feather, AntDesign } from "@expo/vector-icons";
import ModalNewPortfolio from "../components/modals/ModalNewPortfolio";
import addPortfolio from "../services/addPortfolio";
import deletePortfolio from "../services/deletePortfolio";
import getAllPortfolios from "../services/getAllPortfolios";
import ModalLogOut from "../components/modals/ModalLogOut";
import COLORS from "../conts/colors";
import Portfolio from "../components/profile/portfolio";
import Loader from "../components/general/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PortfolioContext from "../context/PortfolioContext";
const vh = Dimensions.get("window").height;
const vw = Dimensions.get("window").width;
export default function PortfolioScreen({ navigation }) {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  function toggleModalDelete() {
    setModalDelete(!modalDelete);
  }
  function toggleLoading() {
    setLoading(!loading);
  }
  const [modal, setModal] = useState(false);
  function toggleModal() {
    setModal(!modal);
  }
  const deleteP = async () => {
    let rep = await deletePortfolio(deletedId);
    if (rep.data.status) {
      setData((data) => data.filter((item) => item.id !== deletedId));
    }
    toggleModalDelete();
  };
  const submit = async (data) => {
    let rep = await addPortfolio(data);
    if (rep.data.status) {
      setData((prevData) => [
        ...prevData,
        {
          name: rep.data.nom,
          id: rep.data.id,
          profit: 0,
          balance: 0,
        },
      ]);
      let t = 0;
      res.forEach((item) => {
        t += item.balance;
      });
      setTotal(t);
    }
    toggleModal();
  };
  useEffect(() => {
    const loadApi = async () => {
      let user = await AsyncStorage.getItem("userData");
      let res = await getAllPortfolios(JSON.parse(user).Id);
      setData(res);
      let t = 0;
      res.forEach((item) => {
        t += item.balance;
      });
      setTotal(t);
      setSelectedId(JSON.parse(user).portfolio);
    };
    loadApi();
  }, []);
  async function toggle(id) {
    setSelectedId(id);
    let user = JSON.parse(await AsyncStorage.getItem("userData"));
    user.portfolio = id;
    AsyncStorage.setItem("userData", JSON.stringify(user));
    data.forEach((element) => {
      if (element.id == id) {
        setPortfolio(element);
      }
    });
  }
  async function toggleDelete(id) {
    if (id == selectedId) {
      Alert.alert("Error", "You can not delete Default Portfolio!");
    } else {
      toggleModalDelete();
      setDeletedId(id);
    }
  }

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.id === selectedId ? COLORS.green : COLORS.white;
    return (
      <Portfolio
        key={item.id}
        name={item.name}
        image={require("../assets/imgs/0.jpg")}
        balance={item.balance.toFixed(3)}
        profit={item.profit}
        id={item.id}
        toggle={() => toggle(item.id)}
        toggleDelete={() => toggleDelete(item.id)}
        backgroundColor={backgroundColor}
      />
    );
  };
  if (!loaded) {
    return null;
  }
  if (modalDelete) {
    return (
      <ModalLogOut
        backdropOpacity={0.2}
        handleClick={deleteP}
        handleCancel={toggleModalDelete}
        on={modalDelete}
        title={"Remove portfolio"}
        text={
          "Do you want to delete your Portfolio ?" +
          "Performing this action you understand" +
          " that you would not be able to recover your Portfolio."
        }
        btn={"Remove"}
      />
    );
  } else if (modal) {
    return (
      <ModalNewPortfolio
        backdropOpacity={0.2}
        handleClick={() => toggleModal()}
        on={modal}
        submit={submit}
      />
    );
  } else if (loading) {
    return <Loader visible={loading} />;
  }
  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <AntDesign name="arrowleft" size={32} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Your Portfolios</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.textTotal}>Total balance</Text>
          {total && <Text style={styles.valueTotal}>{total}</Text>}
          <TouchableOpacity
            style={styles.addContainer}
            onPress={() => toggleModal()}
          >
            <View style={styles.add}>
              <Feather name={"plus"} size={vw * 0.07} color={COLORS.white} />
            </View>
            <Text style={styles.addText}>Create portfolio</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <FlatList
          data={data}
          keyExtractor={(item) => `key-${item.id}`}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    backgroundColor: "#f8f8f4", //
    height: "100%",
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "baseline",
    padding: vw * 0.03,
  },
  line: {
    borderColor: "#f1f1f1",
    borderWidth: 1,
    marginHorizontal: vw * 0.03,
    marginBottom: vw * 0.03,
  },
  text: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    marginBottom: vh * 0.01,
  },
  value: {
    color: "#58667e",
    fontFamily: "Mulish_400Regular",
  },
  suitcase: {
    backgroundColor: COLORS.blue,
    padding: vw * 0.03,
    borderRadius: 20,
    marginRight: vw * 0.05,
  },
  body: {
    padding: vw * 0.04,
  },
  textTotal: {
    fontFamily: "Mulish_700Bold",
    color: "#818181",
    fontSize: 16,
  },
  valueTotal: {
    fontFamily: "Mulish_700Bold",
    fontSize: 38,
    marginBottom: 25,
  },
  title: {
    fontFamily: "Mulish_700Bold",
    fontSize: 24,
    marginLeft: vw * 0.15,
  },
  exit: {
    transform: [{ rotate: "45deg" }],
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  add: {
    backgroundColor: COLORS.blue,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  addText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
    marginLeft: 20,
  },
});
