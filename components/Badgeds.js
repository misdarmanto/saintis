import React, { memo, useEffect, useState } from "react";
import { Primary, TextColorLight } from "../Global/Color";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import { StyleSheet, FlatList, View, Pressable, Text } from "react-native";
import { colorPrimary, colorSecondary } from "../assets/Colors/Colors";
import { heightPercentage } from "../Global/Dimensions";

const Badgeds = (props) => {
  const { sorting, isRefresh, badged } = props;
  const [badgedOnclick, setBadgedOnclick] = useState("Semua");

  useEffect(() => {
    setBadgedOnclick("Semua");
  }, [isRefresh]);

  const renderItem = ({ item }) => {
    return (
      <Budged
        active={item === badgedOnclick}
        text={item}
        onPress={() => {
          setBadgedOnclick(item);
          sorting(item);
        }}
      />
    );
  };
  return (
    <View style={styles.budgedContainer}>
      <FlatList
        // ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={badged}
        keyExtractor={(badged) => badged}
        renderItem={renderItem}
      />
    </View>
  );
};

const Budged = ({ active, text, onPress }) => {
  return (
    <Pressable
      style={[
        styles.badged,
        { backgroundColor: active ? colorPrimary : colorSecondary },
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.badgedText, { color: active ? "#FFF" : TextColorLight }]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  budgedContainer: {
    flexDirection: "row",
  },
  badged: {
    justifyContent: "center",
    alignItems: "center",
    height: heightSize("5%"),
    margin: 5,
    paddingHorizontal: widthSize("5%"),
    minWidth: widthSize("25%"),
    borderRadius: 50,
  },
  badgedText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default memo(Badgeds);
