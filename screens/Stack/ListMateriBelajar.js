import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import List from "../../components/List";
import { heightPercentage } from "../../Global/Dimensions";
import Layout from "../../Global/Layout";
import { FlatList } from "react-native";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import NotFoundAnimation from "../../components/animations/NotFound";
import NetInfo from "@react-native-community/netinfo";
import InternetNotConnect from "../../pages/InternetNotConnect"
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

const ListMateriBelajar = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const [dataCollections, setDataCollections] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [isOffline, setIsOfflineStatus] = useState(false);
  const dbCollections = collection(db, "materiBelajar");

  const extractData = (snapshoot) => {
    const data = [];
    snapshoot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setDataCollections(data);
    setIsDataAvaliable(true);
  };

  const sorting = (item) => {
    const q = query(dbCollections, where("category", "==", item));
    onSnapshot(q, (querySnapshot) => {
      extractData(querySnapshot);
    });
  };

  useEffect(() => {
    sorting(category);
  }, []);

  const increamentViews = async (id) => {
    const docRef = doc(db, "materiBelajar", id);
    await updateDoc(docRef, {
      views: increment(1),
    });
  };

  const navigateToArtikel = (data) => {
    navigation.navigate("Artikel", data);
  };

  useEffect(() => {
    const getNetInfo = NetInfo.addEventListener((state) => {
      setIsOfflineStatus(!state.isConnected || !state.isInternetReachable);
    });
    return () => getNetInfo();
  }, [isOffline]);

  const renderItem = ({ item }) => {
    const { category, title, likes, views, id } = item;
    return (
      <List
        category={category}
        title={title}
        views={views}
        likes={likes}
        onPress={() => {
          increamentViews(id);
          navigateToArtikel({ data: item, id: id, colRef: "materiBelajar" });
        }}
      />
    );
  };

  return isOffline ? (
    <InternetNotConnect />
  ) : (
    <Layout>
      {!isDataAvaliable ? (
        <LoadingSkeleton />
      ) : dataCollections.length === 0 ? (
        <NotFoundAnimation />
      ) : (
        <FlatList
          style={{ paddingTop: heightPercentage(2) }}
          showsVerticalScrollIndicator={false}
          data={dataCollections}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </Layout>
  );
};

export default ListMateriBelajar;
