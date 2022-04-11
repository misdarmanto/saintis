import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import _ from "lodash";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { ContextApi } from "./helpers/ContextApi";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./helpers/firebase";
import Quiz from "./screens/Quiz";
import IndividualQuiz from "./screens/IndividualQuiz";
import TabNavigation from "./navigations/TabNavigation"
import Articel from "./screens/Stack/Articel";
import ListMateriBelajar from "./screens/Stack/ListMateriBelajar";
import LoginScreen from "./screens/Stack/LoginScreen";
import SignInScreen from "./screens/Stack/SignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TryOut from "./screens/Stack/TryOut";
import TestScreen from "./screens/Stack/TestScreen";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific log
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [userData, setUserData] = useState({});
  const Stack = createNativeStackNavigator();

  const [loaded] = useFonts({
    lora: require("./assets/Font/Lora-VariableFont_wght.ttf"),
    lato: require("./assets/Font/Lato-Black.ttf"),
  });

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuth(true);
        const docRef = doc(db, "users", user.email);
        const unsub = onSnapshot(docRef, (doc) => {
          setUserData({ userID: user.email, ...doc.data() });
          setIsDataAvaliable(true);
        });
        return () => unsub;
      } else {
        setIsAuth(false);
        setIsDataAvaliable(true);
      }
    });
  }, []);

  if (!loaded) return null;
  if (!isDataAvaliable) return null;

  return (
    <ContextApi.Provider value={{ userData, setIsAuth }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuth ? (
            <>
              <Stack.Screen
                name="Main"
                component={TabNavigation}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="IndividualQuiz"
                component={IndividualQuiz}
                options={{
                  title: "Tryout",
                  headerTitleStyle: "bold",
                }}
              />
              <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{
                  title: "Tryout",
                  headerTitleStyle: "bold",
                }}
              />
              <Stack.Screen
                name="ListMateriBelajar"
                component={ListMateriBelajar}
                options={{
                  title: "",
                  headerTitleStyle: "bold",
                }}
              />
              <Stack.Screen
                name="Artikel"
                component={Articel}
                options={{
                  title: "",
                  headerTitleStyle: "bold",
                }}
              />
              <Stack.Screen
                name="TryOut"
                component={TryOut}
                options={{
                  title: "",
                  headerTitleStyle: "bold",
                }}
              />
              <Stack.Screen
                name="TestScreen"
                component={TestScreen}
                options={{
                  title: "",
                  headerTitleStyle: "bold",
                }}
              />
             </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Daftar"
                component={SignInScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" backgroundColor="#FFF" />
      </NavigationContainer>
    </ContextApi.Provider>
  );
}
