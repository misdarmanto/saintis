import { useNavigation } from "@react-navigation/native";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import TextPrimary from "../../components/Text/TextPrimary";
import Layout from "../../Global/Layout";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
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
import NotFoundAnimation from "../../components/animations/NotFound";
import List from "../../components/List";
import { FlatList } from "react-native";
import LoadingSkeleton from "../../components/LoadingSkeleton";

const LisTryOutScreen = () => {
  const navigation = useNavigation();
  const dbCollections = collection(db, "tryOut");
  const docRef = doc(db, "tryOut", "tryOutHeader");
  const [headerDocument, setHeaderDocument] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);

  const sorting = (id) => {
    const q = query(dbCollections, where("meta.tryOutID", "==", id));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      navigation.navigate("TryOut", { data, tryOutInfo: headerDocument[id] });
    });
  };

  const getHeaderDocument = async () => {
    const document = await getDoc(docRef);
    setHeaderDocument(document.data().headerDocument);
    setIsDataAvaliable(true);
  };

  useEffect(() => getHeaderDocument(), []);

  const renderItem = ({ item }) => {
    const { title, views, id, category, jumlahSoal } = item;
    return (
      <List
        title={title}
        views={views}
        onPress={() => sorting(id)}
        category={category}
        soal={jumlahSoal}
      />
    );
  };

  return (
    <Layout>
      {/* <TextPrimary>hello world</TextPrimary>
      <Button title="get data" onPress={() => navigation.navigate("TestScreen")} /> */}
      {!isDataAvaliable && <LoadingSkeleton />}
      {isDataAvaliable && headerDocument.length === 0 ? (
        <NotFoundAnimation />
      ) : (
        <FlatList
          style={{ paddingTop: heightPercentage(2) }}
          showsVerticalScrollIndicator={false}
          data={headerDocument}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </Layout>
  );
};

export default LisTryOutScreen;

// const getDocuments = async () => {
//   const q = query(dbCollections, orderBy("meta.title", "asc"));
//   onSnapshot(q, (snapshoot) => {
//     extractData(snapshoot);
//   });
// };

{
  /* <MathJaxSvg
  fontSize={16}
  color={"black"}
  fontCache={true}
  style={{
    color: "black",
    fontSize: 15,
    lineHeight: 25,
    textAlign: "justify",
    flexWrap: "wrap",
  }}
>
  {`$$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}\\frac{(2x + 3^2) (2x+2)}{3}$$
    hello world $$\\frac{x}{y}$$
    `}
</MathJaxSvg>; */
}
