import React, { memo } from "react";
import { Primary, BackGround, TextColorDark } from "../Global/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "react-native";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import TextPrimary from "./Text/TextPrimary";
import CardSmall from "./Card/CardSmall";
import {
  colorPink,
  colorPrimary,
  colorSecondary,
} from "../assets/Colors/Colors";
import IconCricle from "./IconCricle";
import TextSmall from "./Text/TextSmall";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import TextFormat from "./Text/TextFormat";

function List(props) {
  const { title, soal, onPress, newListItem, category, likes, views } = props;

  let iconComponent;
  switch (category) {
    case "Pengetahuan Kuantitatif":
      iconComponent = (
        <FontAwesome5 name="calculator" size={35} color={colorPrimary} />
      );
      break;
    case "PPU dan PBM":
      iconComponent = (
        <FontAwesome5 name="book" size={35} color={colorPrimary} />
      );
      break;
    case "Bahasa Indonesia":
      iconComponent = (
        <FontAwesome5 name="book" size={35} color={colorPrimary} />
      );
      break;
    case "Penalaran Umum":
      iconComponent = (
        <FontAwesome5 name="brain" size={35} color={colorPrimary} />
      );
      break;
    case "TPS":
      iconComponent = (
        <FontAwesome5 name="brain" size={35} color={colorPrimary} />
      );
      break;
    case "Saintek":
      iconComponent = (
        <Fontisto
          name="atom"
          size={35}
          color={colorPrimary}
          style={{ width: widthPercentage(10) }}
        />
      );
      break;
    case "Bahasa Inggris":
      iconComponent = (
        <FontAwesome name="language" size={35} color={colorPrimary} />
      );
      break;
    case "Matematika":
      iconComponent = (
        <FontAwesome5 name="square-root-alt" size={35} color={colorPrimary} />
      );
      break;
    case "Fisika":
      iconComponent = <Fontisto name="atom" size={35} color={colorPrimary} />;
      break;
    case "Kimia":
      iconComponent = (
        <SimpleLineIcons name="chemistry" size={35} color={colorPrimary} />
      );
      break;
    case "TryOut":
      iconComponent = (
        <FontAwesome5
          name="trophy"
          size={30}
          color={colorPrimary}
          style={{ width: widthPercentage(9) }}
        />
      );
      break;
    case "Biologi":
      iconComponent = (
        <MaterialCommunityIcons
          name="virus-outline"
          size={40}
          color={colorPrimary}
        />
      );
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.Container}>
      <IconCricle>{iconComponent}</IconCricle>
      <View style={styles.content}>
        <View style={styles.titleTop}>
          <TextPrimary>{title}</TextPrimary>
        </View>
        <View style={styles.titleBottom}>
          {soal !== undefined && (
            <CardSmall style={{ marginRight: widthSize("2%") }}>
              <FontAwesome5 name="book" size={15} color={colorPrimary} />
              <TextSmall style={{ fontSize: 10 }}>{soal}</TextSmall>
            </CardSmall>
          )}
          {views !== undefined && (
            <CardSmall>
              <FontAwesome5
                name="user-alt"
                size={15}
                color={colorPrimary}
                style={{ width: widthPercentage(4) }}
              />
              <TextFormat text={views} />
            </CardSmall>
          )}
          {likes !== undefined && (
            <CardSmall style={{ marginLeft: widthSize("2%") }}>
              <AntDesign
                name="heart"
                size={15}
                color={colorPink}
                style={{ width: widthPercentage(4) }}
              />
              <TextFormat text={likes} />
            </CardSmall>
          )}
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
        {newListItem && (
          <CardSmall style={styles.newList}>
            <Text style={{ color: TextColorDark }}>New</Text>
          </CardSmall>
        )}
        <AntDesign name="right" size={15} color={TextColorDark} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    width: widthSize("17%"),
    height: heightSize("9%"),
    borderRadius: 45,
    backgroundColor: BackGround,
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightSize("2%"),
    marginBottom: heightSize("2%"),
  },
  content: {
    flex: 1,
    paddingLeft: widthSize("5%"),
  },
  titleTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleBottom: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  boxIcon: {
    backgroundColor: BackGround,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
  },
  newList: {
    marginBottom: heightSize(5),
    backgroundColor: colorSecondary,
    borderRadius: 10,
    paddingHorizontal: widthSize(2),
  },
});

export default memo(List);
