import { useNavigation } from "@react-navigation/native";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import React, { useState, useEffect } from "react";
import { Button, TouchableOpacity } from "react-native";
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
import Container from "../../components/Container";
import { BackGround, Primary } from "../../Global/Color";

const LisTryOutScreen = () => {
  const navigation = useNavigation();
  const dbCollections = collection(db, "tryOut");
  const docRef = doc(db, "tryOut", "tryOutHeader");
  const [headerDocument, setHeaderDocument] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [badgedSelect, setBadgedSelect] = useState(1);

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
    setIsDataAvaliable(false);
    const document = await getDoc(docRef);
    setHeaderDocument([]);
    // setHeaderDocument(document.data().headerDocument);
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

  const rendarTags = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: widthPercentage(5),
          height: heightPercentage(8),
          justifyContent: "center",
        }}
        onPress={() => {
          getHeaderDocument();
          setBadgedSelect(item.id);
        }}
      >
        <TextPrimary
          style={
            badgedSelect === item.id
              ? {
                  fontSize: 20,
                }
              : { fontSize: 15 }
          }
        >
          {item.tag}
        </TextPrimary>
      </TouchableOpacity>
    );
  };

  const TagList = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={[
          { id: 1, tag: "Semua" },
          { id: 2, tag: "Belum dikerjakan" },
          { id: 3, tag: "Tidak dikerjakan" },
        ]}
        renderItem={rendarTags}
        keyExtractor={(item) => item.id}
      />
    );
  };
  return (
    <Layout style={{ flex: 1 }}>
      {/* <TextPrimary>hello world</TextPrimary>
      <Button title="get data" onPress={() => navigation.navigate("TestScreen")} /> */}
      <Container>
        <TagList />
      </Container>
      {!isDataAvaliable && <LoadingSkeleton />}
      {isDataAvaliable && headerDocument.length === 0 ? (
        <NotFoundAnimation massage="Opss... Belum ada" />
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
