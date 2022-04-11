import React, { memo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ButtonStyle from "../components/Buttonscomponent/Button";
import { BackGround, TextColorLight } from "../Global/Color";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "../Global/Layout";
import TextPrimary from "../components/Text/TextPrimary";
import CardSmall from "../components/Card/CardSmall";
import TextSmall from "../components/Text/TextSmall";
import { colorSecondary } from "../assets/Colors/Colors";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import Container from "../components/Container";

const TryOutStart = (props) => {
  const { onPress, jumlahSoal, level, title, setTimer, timer } = props;
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <TextPrimary>{title}</TextPrimary>
          <View style={styles.cardWrap}>
            <CardSmall>
              <FontAwesome5 name="book" size={24} color={TextColorLight} />
              <TextSmall>Soal: {jumlahSoal}</TextSmall>
            </CardSmall>
            {level !== undefined && (
              <CardSmall>
                <FontAwesome5 name="running" size={24} color={TextColorLight} />
                <TextSmall> level : {level}</TextSmall>
              </CardSmall>
            )}
          </View>
          <Container styles={styles.cardWrap}>
            <CardSmall>
              <MaterialIcons name="timer" size={24} color={TextColorLight} />
              <TextSmall>menit: {timer}</TextSmall>
            </CardSmall>

            {/* timer setting */}
            <View style={{ flexDirection: "row" }}>
              <ButtonTimer
                title={"+"}
                onPress={() => (timer < 60 ? setTimer(timer + 1) : null)}
              />
              <ButtonTimer
                title={"-"}
                onPress={() => (timer !== 0 ? setTimer(timer - 1) : null)}
              />
            </View>
          </Container>
          <ButtonStyle onPress={onPress} title="Mulai" />
        </View>
      </View>
    </Layout>
  );
};

const ButtonTimer = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={{ marginLeft: widthSize("2%") }} onPress={onPress}>
      <CardSmall>
        <TextSmall
          style={{
            marginHorizontal: widthPercentage(4),
            backgroundColor: colorSecondary,
            fontSize: 18,
          }}
        >
          {title}
        </TextSmall>
      </CardSmall>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: widthSize("2%"),
  },
  cardContainer: {
    minHeight: heightSize("25%"),
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "space-between",
    paddingVertical: heightSize("5%"),
    paddingHorizontal: widthSize("2%"),
  },
  cardWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: heightPercentage(1),
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: BackGround,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: widthSize("2%"),
    paddingVertical: heightSize("1%"),
    borderRadius: 10,
  },
});

export default memo(TryOutStart);
