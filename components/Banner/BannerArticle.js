import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Container from "../../components/Container";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import { colorDark, colorPink } from "../../assets/Colors/Colors";
import TextPrimary from "../../components/Text/TextPrimary";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  orderBy,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../helpers/firebase";
import TextFormat from "../Text/TextFormat";

const BannerArticel = () => {
  const dbCollections = collection(db, "artikel");
  const [dataCollections, setDataCollections] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const navigation = useNavigation();

  const getDocuments = async () => {
    const q = query(dbCollections, orderBy("title", "asc"));
    onSnapshot(q, (snapshoot) => {
      extractData(snapshoot);
    });
  };

  const increamentViews = async (documentID) => {
    await updateDoc(doc(db, "artikel", documentID), {
      views: increment(1),
    });
  };

  const extractData = (snapshoot) => {
    const data = [];
    snapshoot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setDataCollections(data);
    setIsDataAvaliable(true);
  };

  const navigateToArticle = (item) => {
    navigation.navigate("Artikel", {
      data: item,
      id: item.id,
      colRef: "artikel",
      isArticle: true,
    });
  };
  useEffect(() => {
    getDocuments();
  }, []);

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToArticle(item);
          increamentViews(item.id);
        }}
      >
        <Container styles={styles.container}>
          <View style={styles.titleArticel}>
            <TextPrimary>
              {item.title.length > 25
                ? item.title.slice(0, 25) + "....."
                : item.title}
            </TextPrimary>
            <View style={styles.groupIcon}>
              <View style={styles.iconStyle}>
                <Ionicons name="eye" size={20} color={colorDark} />
                <TextFormat text={item.views} />
              </View>
              <View style={styles.iconStyle}>
                <AntDesign
                  name="heart"
                  size={18}
                  color={colorPink}
                  style={{ width: widthPercentage(5) }}
                />
                <TextFormat text={item.likes} />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: widthPercentage(90),
            }}
          >
            <Text style={styles.textDescription}>
              {item.text.length > 200
                ? item.text.slice(0, 200) + "....."
                : item.text}
            </Text>
          </View>
        </Container>
      </TouchableOpacity>
    );
  };

  return (
    isDataAvaliable && (
      <FlatList
        data={dataCollections}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={RenderItem}
      />
    )
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightPercentage(20),
    width: widthPercentage(95),
    borderRadius: 0,
    marginBottom: heightPercentage(2),
    justifyContent: "flex-start",
  },
  titleArticel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: heightPercentage(2),
  },
  groupIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: widthPercentage(30),
  },
  iconStyle: {
    flexDirection: "row",
  },
  textDescription: {
    color: "#d3d3d3",
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: widthPercentage(2),
  },
});

export default BannerArticel;
