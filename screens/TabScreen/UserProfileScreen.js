import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, Share, View } from "react-native";
import CardList from "../../components/Card/cardList";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import { AntDesign } from "@expo/vector-icons";
import Layout from "../../Global/Layout";
import { TextColorDark } from "../../Global/Color";
import { Entypo } from "@expo/vector-icons";
import * as StoreReview from "expo-store-review";
import { Linking, Text } from "react-native";
import TextParagraph from "../../components/Text/TextParagraph";
import IconCricle from "../../components/IconCricle";
import {
  colorGray,
  colorLight,
  colorPink,
  colorPrimary,
  colorSecondary,
} from "../../assets/Colors/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { ContextApi } from "../../helpers/ContextApi";
import TextSmall from "../../components/Text/TextSmall";
import onShare from "../../functions/shareFunction";

const UserProfileScreen = () => {
  const { userData } = useContext(ContextApi);

  const riviewPlayStore = async () => {
    if (await StoreReview.hasAction()) {
      Linking.openURL(
        `market://details?id=com.misdar.saintis&showAllReviews=true`
      );
      StoreReview.requestReview();
    }
  };

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("sign out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Layout style={{ backgroundColor: colorSecondary }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <IconCricle styles={{ backgroundColor: "#FFF" }}>
          <FontAwesome5
            name="user-alt"
            size={30}
            color={colorPrimary}
            style={{ width: widthPercentage(8) }}
          />
        </IconCricle>
        <Text style={{ fontSize: 18, color: colorLight }}>{userData.name}</Text>
        <TextSmall style={{ color: colorGray }}>{userData.email}</TextSmall>
      </View>
      <ListButton onPress={riviewPlayStore}>
        <TextParagraph style={{ fontSize: 18 }}>
          Beri Rating Aplikasi ini
        </TextParagraph>
        <AntDesign name="star" size={25} color={colorPrimary} />
      </ListButton>
      <ListButton onPress={onShare}>
        <TextParagraph style={{ fontSize: 18 }}>
          Bagikan Aplikasi ini
        </TextParagraph>
        <Entypo name="share" size={25} color={colorPrimary} />
      </ListButton>
      <ListButton onPress={logOut}>
        <TextParagraph style={{ fontSize: 18 }}>Keluar</TextParagraph>
        <MaterialIcons name="logout" size={28} color={colorPink} />
      </ListButton>
    </Layout>
  );
};

const ListButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CardList style={style.listContainer}>{children}</CardList>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  listContainer: {
    height: heightPercentage(10),
    flexDirection: "row",
    paddingHorizontal: widthPercentage(3),
    marginVertical: heightPercentage(0.5),
  },
  testStyle: {
    fontSize: 20,
    color: TextColorDark,
  },
});

export default UserProfileScreen;
