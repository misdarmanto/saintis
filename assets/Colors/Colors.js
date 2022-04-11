import { LinearGradient } from "expo-linear-gradient";

const ColorLinierGradient = ({ children, styles }) => {
  return (
    <LinearGradient
      colors={["#304FFE", "#7000FF"]}
      start={[0.9, 0.1]}
      style={styles}
    >
      {children}
    </LinearGradient>
  );
};

const colorSecondary = "#F4F6FE";
const colorPrimary = "#304FFE";
const colorGray = "#C4C4C4";
const colorPink = "#FE30AC";
const colorQorrectAnswer = "#A5A6F6";
const colorDark = "#667685";
const colorLight = "#35689A";

export {
  colorPrimary,
  colorSecondary,
  colorGray,
  colorPink,
  colorQorrectAnswer,
  ColorLinierGradient,
  colorDark,
  colorLight
};
