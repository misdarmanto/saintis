import React, { useState, useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import List from "../components/List";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../helpers/firebase";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import InternetNotConnect from "../pages/InternetNotConnect";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Layout from "../Global/Layout";
import { heightPercentage } from "../Global/Dimensions";
import NotFoundAnimation from "../components/animations/NotFound";
import BannerAdd from "../components/Adds/BannerAdd";

const IndividualQuiz = ({ route }) => {
  const { quizName } = route.params;
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const [isOffline, setIsOfflineStatus] = useState(false);
  const dbCollections = collection(db, "SoalUTBK");
  const navigation = useNavigation();

  useEffect(() => {
    const getNetInfo = NetInfo.addEventListener((state) => {
      setIsOfflineStatus(!state.isConnected || !state.isInternetReachable);
    });
    if (!isOffline) sorting(quizName);
    return () => getNetInfo();
  }, [isOffline]);

  const extractData = (snapshoot) => {
    const data = [];
    snapshoot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setDataCollections(data);
    setIsDataAvaliable(true);
  };

  const sorting = (item) => {
    const q = query(dbCollections, where("meta.category", "==", item));
    onSnapshot(q, (querySnapshot) => {
      extractData(querySnapshot);
    });
  };

  const navigateToQUiz = (item) => {
    navigation.navigate("Quiz", {
      DB: item.soal,
      level: item.meta.level,
      isUsingMath: item.meta.usingMath,
      title: item.meta.title,
    });
  };

  const renderItem = ({ item }) => {
    const { category, title, icon, level, isNewItem } = item.meta;
    return (
      <List
        category={category}
        title={title}
        soal={item.soal.length}
        icon={icon}
        level={level}
        newListItem={isNewItem}
        onPress={() => navigateToQUiz(item)}
      />
    );
  };

  return isOffline ? (
    <InternetNotConnect />
  ) : (
    <>
      {!isDataAvaliable && <LoadingSkeleton />}

      {/* List Item */}
      {dataCollections.length === 0 && isDataAvaliable && <NotFoundAnimation />}
      {isDataAvaliable && (
        <Layout>
          <FlatList
            style={{ paddingTop: heightPercentage(2) }}
            showsVerticalScrollIndicator={false}
            data={dataCollections}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          {/* <BannerAdd
            size={"banner"}
            styles={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItem: "center"
            }}
          /> */}
        </Layout>
      )}
    </>
  );
};

export default IndividualQuiz;
