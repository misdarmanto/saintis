import React, { useState, useContext } from "react";
import TextPrimary from "../../components/Text/TextPrimary";
import Layout from "../../Global/Layout";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colorGray } from "../../assets/Colors/Colors";
import { Feather } from "@expo/vector-icons";
import ButtonStyle from "../../components/Buttonscomponent/Button";
import TextSmall from "../../components/Text/TextSmall";
import InputField from "../../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase";
import { ContextApi } from "../../helpers/ContextApi";

const SignInScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [nameError, setNameError] = useState("");
  const navigation = useNavigation();
  const { setIsAuth } = useContext(ContextApi);

  const submit = () => {
    setErrorMessageEmail("");
    setErrorMessagePassword("");
    setNameError("");
    if (name === "") {
      setNameError("Opss... tidak boleh ada yg kosong");
      setIsError(true);
      return;
    }
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, "users", email.toLowerCase()), {
          name: name,
          email: email,
          password: password,
          userLikes: [],
        });
        navigation.navigate("Main");
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
          case "auth/weak-password":
            setErrorMessagePassword("Opss... password tidak aman");
            break;
        }
        setIsError(true);
      });
  };

  return (
    <Layout style={styles.container}>
      {/* title */}
      <View style={styles.title}>
        <TextPrimary style={{ fontSize: 25 }}>Daftar</TextPrimary>
      </View>

      {/* input fields */}
      <View>
        <InputField
          value={name}
          onChangeText={(value) => {
            setName(value);
            setIsError(false);
          }}
          placeholder={"Nama..."}
          error={isError}
          errorMessage={nameError}
        >
          <FontAwesome5
            name="user-alt"
            size={24}
            color={colorGray}
            style={{ width: widthPercentage(6) }}
          />
        </InputField>
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
          error={isError}
          errorMessage={errorMessagePassword}
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
        >
          <Feather name="lock" size={24} color={colorGray} />
        </InputField>
        <ButtonStyle
          style={{ marginTop: heightPercentage(4) }}
          title="Daftar"
          onPress={submit}
        />
      </View>

      {/* text bottom */}
      <View style={styles.textBottom}>
        <TextSmall style={{ fontSize: 16 }}>Sudah Punya Akun?</TextSmall>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <TextPrimary>Login</TextPrimary>
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
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SignInScreen;
