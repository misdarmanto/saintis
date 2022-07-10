import React, { useEffect, useRef, useState, memo } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import ButtonStyle from "../components/Buttonscomponent/Button";
import Progress from "../components/Progress";
import { TextColorLight } from "../Global/Color";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/Card/Card";
import RewardedAdd from "../components/Adds/RewardedAdd";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CardSmall from "../components/Card/CardSmall";
import TextSmall from "../components/Text/TextSmall";
import { widthPercentage } from "../Global/Dimensions";
import Layout from "../Global/Layout";
import TextPrimary from "../components/Text/TextPrimary";
import { colorLight, colorSecondary } from "../assets/Colors/Colors";
import playStoreRiview from "../functions/playstoreRiview";
import { Entypo } from "@expo/vector-icons";
import onShare from "../functions/shareFunction";

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

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout style={{ backgroundColor: colorSecondary }}>
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
              <TouchableOpacity
                style={[styles.list, { marginBottom: heightSize("1%") }]}
                onPress={onShare}
              >
                <TextPrimary>Bagikan</TextPrimary>
                <Entypo name="share" size={30} color={TextColorLight} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.list, { marginBottom: heightSize("4%") }]}
                onPress={playStoreRiview}
              >
                <TextPrimary>Beri Ulasan</TextPrimary>
                <AntDesign name="star" size={30} color={TextColorLight} />
              </TouchableOpacity>
              <ButtonStyle
                title="Lihat Pembahasan"
                onPress={() => {
                  onPress();
                  const random = Math.floor(Math.random() * 3);
                  if (random === 1) RewardedAdd();
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
