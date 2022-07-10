import React from "react";

import { useWindowDimensions } from "react-native";
import Layout from "../../Global/Layout";
import { widthPercentage } from "../../Global/Dimensions";

const TestScreen = () => {
  const { width } = useWindowDimensions();
  const source = {
    html: `
    <h1 style='text-align:center; color: pink'>
        Hello World!
    </h1>
    <p style='text-align:center; color: pink'>
        Hello World!
    </p>`,
  };

  return <Layout></Layout>;
};

export default TestScreen;
