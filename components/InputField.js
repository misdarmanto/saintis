import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import { colorGray, colorPink } from "../assets/Colors/Colors";
import { Ionicons } from "@expo/vector-icons";

const InputField = ({
  children,
  onChangeText,
  value,
  placeholder,
  styles,
  error,
  scure,
  showPassword,
  setShowPassword,
  icon,
  errorMessage,
}) => {
  return (
    <View
      style={{
        marginVertical: heightPercentage(1),
      }}
    >
      <View
        style={[
          {
            paddingHorizontal: widthPercentage(5),
            height: heightPercentage(8),
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: error ? colorPink : "#f3f3f3",
            backgroundColor: "#FFF",
            borderRadius: 30,
          },
          styles,
        ]}
      >
        {children}
        <TextInput
          style={{
            paddingHorizontal: widthPercentage(5),
            fontSize: 16,
            color: colorGray,
            width: widthPercentage(70),
          }}
          onPressIn={() => console.log("hello")}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={scure}
        />
        {icon ? (
          showPassword ? (
            <Ionicons
              name="md-eye-off"
              size={24}
              color={colorGray}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Ionicons
              name="md-eye"
              size={24}
              color={colorGray}
              onPress={() => setShowPassword(!showPassword)}
            />
          )
        ) : null}
      </View>
      {error && (
        <Text style={{ color: colorPink, paddingLeft: widthPercentage(5) }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default InputField;
