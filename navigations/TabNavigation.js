import {
  HeaderLeftComponent,
  HeaderRightComponent,
} from "./HeaderLeftAndRight";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListQuiz from "../screens/TabScreen/ListQuiz";
import HomeScreen from "../screens/TabScreen/HomeScreen";
import UserProfileScreen from "../screens/TabScreen/UserProfileScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import { TextColorDark, Gray } from "../Global/Color";
import { MaterialIcons } from "@expo/vector-icons";
import { colorPrimary } from "../assets/Colors/Colors";
import LisTryOutScreen from "../screens/TabScreen/LisTryOutScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerLeft: () => <HeaderLeftComponent />,
        headerRight: () => <HeaderRightComponent />,
        headerTitleStyle: { color: TextColorDark },
        tabBarStyle: { height: heightPercentage(8) },
        tabBarIcon: ({ color }) => {
          if (route.name === "Explore") {
            return <MaterialIcons name="explore" size={30} color={color} />;
          } else if (route.name === "LatihanSoal") {
            return <FontAwesome5 name="tasks" size={27} color={color} />;
          } else if (route.name === "LisTryOut") {
            return (
              <FontAwesome5
                name="trophy"
                size={27}
                color={color}
                style={{ width: widthPercentage(8) }}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <FontAwesome5
                name="user-graduate"
                size={24}
                color={color}
                style={{ width: widthPercentage(6) }}
              />
            );
          }
        },
        tabBarActiveTintColor: colorPrimary,
        tabBarInactiveTintColor: "#DAE1FF",
      })}
    >
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{ title: "Explore" }}
      />
      <Tab.Screen
        name="LatihanSoal"
        component={ListQuiz}
        options={{ title: "latihan soal" }}
      />
      <Tab.Screen
        name="LisTryOut"
        component={LisTryOutScreen}
        options={{ title: "Try Out" }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
