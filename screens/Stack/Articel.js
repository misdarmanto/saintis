import React, { useState, useContext, useEffect } from "react";
import TextParagraph from "../../components/Text/TextParagraph";
import TextPrimary from "../../components/Text/TextPrimary";
import Layout from "../../Global/Layout";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { colorDark, colorPink } from "../../assets/Colors/Colors";
import TextFormat from "../../components/Text/TextFormat";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "../../helpers/firebase";
import { ContextApi } from "../../helpers/ContextApi";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import onShare from "../../functions/shareFunction";


const Articel = ({ route }) => {
  const { data, id, colRef } = route.params;
  const [userPressLikeButton, setUserPressLikeButtom] = useState(false);
  const { userData } = useContext(ContextApi);
  const userDocRef = doc(db, "users", userData.userID);


  const increamentLikes = async () => {
    await updateDoc(doc(db, colRef, id), {
      likes: increment(1),
    });
  };

  const decreamentLikes = async () => {
    await updateDoc(doc(db, colRef, id), {
      likes: increment(-1),
    });
  };

  const likeButtonOnClick = async () => {
    if (!userPressLikeButton) {
      data.likes += 1;
      setUserPressLikeButtom(true);
      await updateDoc(userDocRef, {
        userLikes: arrayUnion(id),
      });
      increamentLikes();
    } else {
      data.likes -= 1;
      setUserPressLikeButtom(false);
      await updateDoc(userDocRef, {
        userLikes: arrayRemove(id),
      });
      decreamentLikes();
    }
  };

  useEffect(() => {
    setUserPressLikeButtom(userData.userLikes.includes(id));
  }, []);

  return (
    <Layout
      style={{ backgroundColor: "#FFF", paddingHorizontal: widthPercentage(3) }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: heightPercentage(3),
          }}
        >
          <TextPrimary>{data.title}</TextPrimary>
          <View style={styles.groupIcon}>
            <View style={styles.iconStyle}>
              <Ionicons name="eye" size={20} color={colorDark} />
              <TextFormat text={data.views} />
            </View>
            <View style={styles.iconStyle}>
              {userPressLikeButton ? (
                <AntDesign
                  name="heart"
                  size={18}
                  color={colorPink}
                  style={{ width: widthPercentage(5) }}
                  onPress={likeButtonOnClick}
                />
              ) : (
                <AntDesign
                  name="hearto"
                  size={18}
                  color={colorPink}
                  style={{ width: widthPercentage(5) }}
                  onPress={likeButtonOnClick}
                />
              )}
              <TextFormat text={data.likes} />
            </View>
            <TouchableOpacity onPress={onShare}>
              <FontAwesome name="share" size={20} color={colorDark} />
            </TouchableOpacity>
          </View>
        </View>
        <MathJaxSvg fontSize={15} color={colorDark} fontCache={true}>
          {`<div style='text-align: justify; line-height: 25'>${data.text}`}
        </MathJaxSvg>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  groupIcon: {
    flexDirection: "row",
    paddingVertical: heightPercentage(2),
  },
  iconStyle: {
    flexDirection: "row",
    marginRight: widthPercentage(5),
  },
});

export default Articel;
