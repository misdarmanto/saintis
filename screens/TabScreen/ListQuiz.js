import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import List from "../../components/List";
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
import { useNavigation } from "@react-navigation/native";
import Badgeds from "../../components/Badgeds";
import NetInfo from "@react-native-community/netinfo";
import InternetNotConnect from "../../pages/InternetNotConnect";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import Layout from "../../Global/Layout";
import { colorSecondary } from "../../assets/Colors/Colors";
import Container from "../../components/Container";
import { heightPercentage } from "../../Global/Dimensions";

export default function ListQuiz() {
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const [isOffline, setIsOfflineStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [badged, setBadged] = useState();
  const dbCollections = collection(db, "soal");
  const docRef = doc(db, "general", "badged");
  const navigation = useNavigation();

  useEffect(() => {
    const getNetInfo = NetInfo.addEventListener((state) => {
      setIsOfflineStatus(!state.isConnected || !state.isInternetReachable);
    });
    if (!isOffline) getDocuments();
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

  const getDocuments = async () => {
    const document = await getDoc(docRef);
    setBadged(document.data().badgeds);
    const q = query(dbCollections, orderBy("meta.title", "asc"));
    onSnapshot(q, (snapshoot) => {
      extractData(snapshoot);
    });
  };

  const sorting = (item) => {
    if (item === "Semua") {
      getDocuments();
    } else {
      const q = query(dbCollections, where("meta.category", "==", item));
      onSnapshot(q, (querySnapshot) => {
        extractData(querySnapshot);
      });
    }
  };

  const navigateToQUiz = (item) => {
    const { level, usingMath, title } = item.meta;
    navigation.navigate("Quiz", {
      DB: item.soal,
      level: level,
      isUsingMath: usingMath,
      title: title,
      id: item.id,
    });
  };

  const increamentViews = async (document) => {
    await updateDoc(doc(db, "soal", document), {
      "meta.views": increment(1),
    });
  };

  const renderItem = ({ item }) => {
    const { category, title, likes, views, isNewItem, level } = item.meta;
    return (
      <List
        category={category}
        title={title}
        soal={item.soal.length}
        level={level}
        likes={likes < 0 ? 0 : likes}
        views={views}
        newListItem={isNewItem}
        onPress={() => {
          increamentViews(item.id);
          navigateToQUiz(item);
        }}
      />
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDataCollections([]);
    setBadged("");
    getDocuments().then(() => setRefreshing(false));
  }, []);

  return isOffline ? (
    <InternetNotConnect />
  ) : (
    <>
      {!isDataAvaliable && <LoadingSkeleton />}

      {/* List Item */}

      {isDataAvaliable && (
        <Layout style={{ backgroundColor: colorSecondary }}>
          <Container styles={{ paddingHorizontal: 0, borderRadius: 0 }}>
            <Badgeds sorting={sorting} isRefresh={refreshing} badged={badged} />
          </Container>
          <FlatList
            style={{ paddingTop: heightPercentage(2) }}
            showsVerticalScrollIndicator={false}
            data={dataCollections}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </Layout>
      )}
    </>
  );
}
