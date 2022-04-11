import React, { useEffect, useRef, useState, memo } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import ButtonStyle from "../components/Buttonscomponent/Button";
import Progress from "../components/Progress";
import { Primary, Red, TextColorLight, Yellow } from "../Global/Color";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/Card/Card";
import * as Linking from "expo-linking";
import RewardedAdd from "../components/Adds/RewardedAdd";
import * as StoreReview from "expo-store-review";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CardSmall from "../components/Card/CardSmall";
import TextSmall from "../components/Text/TextSmall";
import { widthPercentage } from "../Global/Dimensions";
import Layout from "../Global/Layout";
import TextPrimary from "../components/Text/TextPrimary";
import { colorLight, colorSecondary } from "../assets/Colors/Colors";

const Finish = (props) => {
  const {
    progress,
    onPress,
    percent,
    grade: { benar, salah, kosong },
    totalSoal,
    waktuPengerjaan,
  } = props;
  const [animated, setAnimated] = useState(true);
  const animation = useRef(null);

  const riviewPlayStore = async () => {
    if (await StoreReview.hasAction()) {
      Linking.openURL(
        `market://details?id=com.misdar.utbk&showAllReviews=true`
      );
      StoreReview.requestReview();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout style={{backgroundColor: colorSecondary}}>
      <View style={styles.container}>
        {animated ? (
          <LottieView
            ref={animation}
            style={{ width: 400, height: 400 }}
            source={require("../assets/winner.json")}
            autoPlay
            loop={false}
          />
        ) : (
          <>
            <View style={styles.content}>
              <View style={styles.progressContainer}>
                <Progress progress={progress} />
                <Text style={styles.textPercent}>{percent}%</Text>
              </View>
              <View style={styles.cardContainer}>
                <Card number={benar} text="benar" color={colorSecondary} />
                <Card number={salah} text="salah" color={colorSecondary} />
                <Card number={kosong} text="kosong" color={colorSecondary} />
              </View>
              <View
                style={[
                  styles.cardContainer,
                  {
                    justifyContent: "space-between",
                    paddingHorizontal: widthPercentage(3),
                  },
                ]}
              >
                <CardSmall>
                  <FontAwesome5 name="book" size={24} color={TextColorLight} />
                  <TextSmall style={{ color: TextColorLight }}>
                    Soal : {totalSoal}
                  </TextSmall>
                </CardSmall>
                <CardSmall>
                  <MaterialIcons
                    name="timer"
                    size={24}
                    color={TextColorLight}
                  />
                  <TextSmall style={{ color: TextColorLight }}>
                    Waktu : {waktuPengerjaan}
                  </TextSmall>
                </CardSmall>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Pressable
                style={[styles.list, { marginBottom: heightSize("1%") }]}
                onPress={() => Linking.openURL("https://trakteer.id/siapUTBK")}
              >
                <TextPrimary>Trakter kopi</TextPrimary>
                <FontAwesome name="coffee" size={30} color={TextColorLight} />
              </Pressable>
              <Pressable
                style={[styles.list, { marginBottom: heightSize("4%") }]}
                onPress={riviewPlayStore}
              >
                <TextPrimary>Beri Ulasan</TextPrimary>
                <AntDesign name="star" size={30} color={TextColorLight} />
              </Pressable>
              <ButtonStyle
                title="Lihat Pembahasan"
                onPress={() => {
                  onPress();
                  RewardedAdd();
                }}
              />
            </View>
          </>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: heightSize("5%"),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F3F3F3",
    width: widthSize("90%"),
    height: heightSize("35%"),
    padding: 20,
    justifyContent: "space-between",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: heightSize("2%"),
  },
  textPercent: {
    color: colorLight,
    paddingLeft: widthSize("2%"),
    fontWeight: "bold",
    fontSize: 17,
  },
  listContainer: {
    width: widthSize("90%"),
    paddingTop: heightSize("5%"),
  },
  list: {
    backgroundColor: "#FFF",
    height: heightSize("10%"),
    marginBottom: heightSize("1%"),
    paddingLeft: widthSize("3%"),
    paddingRight: widthSize("3%"),
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default memo(Finish);
