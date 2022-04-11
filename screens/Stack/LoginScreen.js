import React, { useState, useEffect, useContext } from "react";
import TextPrimary from "../../components/Text/TextPrimary";
import Layout from "../../Global/Layout";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import { Entypo } from "@expo/vector-icons";
import { colorGray } from "../../assets/Colors/Colors";
import { Feather } from "@expo/vector-icons";
import ButtonStyle from "../../components/Buttonscomponent/Button";
import TextSmall from "../../components/Text/TextSmall";
import InputField from "../../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ContextApi } from "../../helpers/ContextApi";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const { setIsAuth } = useContext(ContextApi)
  const navigation = useNavigation();

  const submit = () => {
    setErrorMessageEmail("");
    setErrorMessagePassword("");

    if (password === "") {
      setErrorMessagePassword("Opss... tidak boleh ada yg kosong");
      setIsError(true);
      return;
    }
    if (email === "") {
      setErrorMessageEmail("Opss... tidak boleh ada yg kosong");
      setIsError(true);
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        // navigation.navigate("Main");
        setIsAuth(true)
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessageEmail("Opss... email tidak valid");
            break;
          case "auth/email-already-in-use":
            setErrorMessageEmail("Opss... email sudah digunakan");
            break;
          case "auth/user-not-found":
            setErrorMessageEmail(
              "Opss... user tidak ditemukan, silahkan buat akun"
            );
            break;
          case "auth/wrong-password":
            setErrorMessagePassword("Opss... Password salah");
            break;
        }
        setIsError(true);
      });
  };

  return (
    <Layout style={styles.container}>
      {/* title */}
      <View style={styles.title}>
        <TextPrimary style={{ fontSize: 25 }}>Login</TextPrimary>
      </View>

      {/* input fields */}
      <View>
        <InputField
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setIsError(false);
          }}
          placeholder={"E-mail..."}
          error={isError}
          errorMessage={errorMessageEmail}
        >
          <Entypo name="email" size={24} color={colorGray} />
        </InputField>
        <InputField
          value={password}
          scure={showPassword}
          icon={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChangeText={(value) => {
            setPassword(value);
            setIsError(false);
          }}
          placeholder={"Password..."}
          error={isError}
          errorMessage={errorMessagePassword}
        >
          <Feather name="lock" size={24} color={colorGray} />
        </InputField>
        <ButtonStyle
          title="Login"
          onPress={submit}
          style={{ marginTop: heightPercentage(2) }}
        />
      </View>

      {/* test bottom */}
      <View style={styles.textBottom}>
        <TextSmall style={{ fontSize: 16 }}>Belum Punya Akun?</TextSmall>
        <TouchableOpacity onPress={() => navigation.navigate("Daftar")}>
          <TextPrimary>Daftar</TextPrimary>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(5),
    justifyContent: "space-between",
  },
  title: {
    height: heightPercentage(10),
    marginTop: heightPercentage(10),
    justifyContent: "center",
    alignItems: "center",
  },
  textBottom: {
    height: heightPercentage(15),
    paddingTop: heightPercentage(2),
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default LoginScreen;
