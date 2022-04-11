import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ColorLinierGradient, colorPrimary } from "../assets/Colors/Colors";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import TextPrimary from "./Text/TextPrimary";
import TextSmall from "./Text/TextSmall";

const BannerApp = ({ styles }) => {
  const [utbkServer, setUtbkServer] = useState(null);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const backupQoute = {
    quotes: {
      author: "Steve Jobs",
      quote: "Do what you love, love what you do",
    },
    timmer: 30,
  };

  useEffect(() => {
    fetch("https://serverutbk.herokuapp.com/api")
      .then((response) => response.json())
      .then((value) => {
        setUtbkServer(value);
        setIsDataAvaliable(true);
      })
      .catch(() => {
        setUtbkServer(backupQoute);
        setIsDataAvaliable(true);
      });
  }, []);
  return (
    <ColorLinierGradient
      styles={[
        {
          height: heightPercentage(20),
          borderRadius: 10,
          flexDirection: "column",
          justifyContent: "center",
        },
        styles,
      ]}
    >
      {isDataAvaliable && (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: widthPercentage(5),
            }}
          >
            <TextPrimary style={{ color: "#FFF", textAlign: "center" }}>
              {utbkServer.quotes.quote}
            </TextPrimary>
            <TextSmall style={{ color: "#FFF" }}>
              ~ {utbkServer.quotes.author} ~
            </TextSmall>
          </View>
        </>
      )}
    </ColorLinierGradient>
  );
};
export default BannerApp;
