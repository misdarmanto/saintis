import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import Layout from "../../Global/Layout";
import BannerApp from "../../components/BannerApp";
import Container from "../../components/Container";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import { colorPrimary, colorSecondary } from "../../assets/Colors/Colors";
import IconCricle from "../../components/IconCricle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import BannerArticel from "../../components/Banner/BannerArticle";

export default HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToArticel = (category = "") => {
    navigation.navigate("ListMateriBelajar", { category: category });
  };

  return (
    <Layout style={{ backgroundColor: colorSecondary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerApp />
        <Container
          styles={{
            height: heightPercentage(35),
            marginVertical: heightPercentage(5),
            paddingHorizontal: widthPercentage(7),
          }}
        >
         
          <IconCricle text={"UTBK TPS"} onPress={() => navigateToArticel("TPS")}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={35}
              color={colorPrimary}
            />
          </IconCricle>
          <IconCricle text={"Saintek"} onPress={() => navigateToArticel("Saintek")}>
            <Fontisto
              name="atom"
              size={35}
              color={colorPrimary}
              style={{ width: widthPercentage(10) }}
            />
          </IconCricle>
          <IconCricle text={"Matematika"} onPress={() => navigateToArticel("Matematika")}>
            {/* <AntDesign name="calculator" size={35} color={colorPrimary} /> */}
            <FontAwesome5
              name="square-root-alt"
              size={30}
              color={colorPrimary}
            />
          </IconCricle>
          <IconCricle text={"B.Indonesia"} onPress={() => navigateToArticel("Bahasa Indonesia")}>
            <FontAwesome5 name="book" size={30} color={colorPrimary} />
          </IconCricle>
          <IconCricle text={"B.Inggris"} onPress={() => navigateToArticel("Bahasa Inggris")}>
            <FontAwesome name="language" size={35} color={colorPrimary} />
          </IconCricle>
          <IconCricle text={"Biologi"} onPress={() => navigateToArticel("Biologi")}>
            <MaterialCommunityIcons
              name="virus-outline"
              size={35}
              color={colorPrimary}
            />
          </IconCricle>
        </Container>
        <BannerArticel />
      </ScrollView>
    </Layout>
  );
};
