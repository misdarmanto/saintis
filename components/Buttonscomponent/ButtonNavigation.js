import React, { memo, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { heightSize, widthSize } from "../../helpers/layoutDimension";
import { BackGround, Primary, TextColorDark } from "../../Global/Color";
import { colorPrimary } from "../../assets/Colors/Colors";

const ButtonNavigation = ({ next, back }) => {
  const [active, setActive] = useState("");
 
  return (
    <View style={styles.buttonContainer}>
      <ButtonToogle
        onClick={() =>{
           back()
           setActive("arrowleft")
        }}
        name="arrowleft"
        active={active}
      />
      <ButtonToogle
        onClick={() => {
          next()
          setActive("arrowright")
        }}
        name="arrowright"
        active={active}
      />
    </View>
  );
};

const ButtonToogle = (props) => {
  const { active, onClick, name } = props;

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        { backgroundColor: active === name ? colorPrimary : BackGround },
      ]}
    >
      <AntDesign
        name={name}
        size={25}
        color={active === name ? "#FFF" : TextColorDark}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    height: heightSize("9%"),
    paddingLeft: widthSize("2%"),
    paddingRight: widthSize("2%"),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: heightSize("7%"),
    width: widthSize("25%"),
    borderRadius: 30,
  },
});

export default memo(ButtonNavigation);
