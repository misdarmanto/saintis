import React, { useCallback, useState, useEffect, useContext } from "react";
import ModalStyle from "../components/Modal";
import ProgressBar from "../components/Progress";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import ButtonNavigation from "../components/Buttonscomponent/ButtonNavigation";
import ButtonField from "../components/Buttonscomponent/ButtonField";
import ButtonFieldRiview from "../components/Buttonscomponent/ButtonFieldContainer";
import Finish from "../pages/Finish";
import QuizStart from "../pages/QuizStart";
import { corection } from "../helpers/Functions";
import { TextColorDark, BackGround } from "../Global/Color";
import BannerAdd from "../components/Adds/BannerAdd";
import MathSymbol from "../components/MathSymboles";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import RewardedAdd from "../components/Adds/RewardedAdd";
import TextPrimary from "../components/Text/TextPrimary";
import TextParagraph from "../components/Text/TextParagraph";
import { millisToMinutesAndSeconds } from "../helpers/Functions";
import { colorLight, colorPink, colorSecondary } from "../assets/Colors/Colors";
import { widthPercentage } from "../Global/Dimensions";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ContextApi } from "../helpers/ContextApi";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "../helpers/firebase";

export default function Quiz({ route }) {
  const { DB, level, isUsingMath, title, id } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progres, setProgres] = useState(1 / DB.length);
  const { question, answer, corectAnswer, pembahasan } = DB[currentIndex];

  const [buttonSelect, setButtonSelect] = useState({});
  const [isRiview, setIsRiview] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [grade, setGrade] = useState({});
  const [quizStart, setQuizStart] = useState(true);

  const [timer, setTimer] = useState(1);
  const [count, setCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const [totalWaktuPengerjaanQuiz, setTotalWaktuPengerjaanQuiz] =
    useState(null);
  const navigation = useNavigation();

  const [userPressLikeButton, setUserPressLikeButtom] = useState(false);
  const { userData } = useContext(ContextApi);
  const userDocRef = doc(db, "users", userData.userID);

  const increamentLikes = async (document) => {
    await updateDoc(doc(db, "soal", document), {
      "meta.likes": increment(1),
    });
  };

  const decreamentLikes = async (document) => {
    await updateDoc(doc(db, "soal", document), {
      "meta.likes": increment(-1),
    });
  };


  const likeButtonOnClick = async () => {
    if (!userPressLikeButton) {
      setUserPressLikeButtom(true);
      await updateDoc(userDocRef, {
        userLikes: arrayUnion(id),
      });
      increamentLikes(id);
    } else {
      setUserPressLikeButtom(false);
      await updateDoc(userDocRef, {
        userLikes: arrayRemove(id),
      });
      decreamentLikes(id)
    }
  };

  useEffect(() => {
    setUserPressLikeButtom(userData.userLikes.includes(id));
  }, []);

  const next = useCallback(() => {
    if (currentIndex === 10 && isRiview) {
      const random = Math.floor(Math.random() * 2);
      if (random === 1) RewardedAdd();
    } 
    if (currentIndex === DB.length - 1) {
      if (!isRiview) {
        setModalVisible(true);
      }
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setProgres(progres + 1 / DB.length);
  }, [currentIndex]);

  const back = useCallback(() => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
    setProgres(progres - 1 / DB.length);
  }, [currentIndex]);

  useEffect(() => {
    setCount(DB.length);
    setTimer(DB.length);
  }, []);

  useEffect(() => {
    if (isFinish) setGrade(corection(DB, buttonSelect));

    navigation.setOptions({
      headerRight: () =>
        startCounting &&
        !isFinish &&
        !isRiview && (
          <CountDown
            style={{ marginRight: widthSize("5%") }}
            until={60 * timer}
            size={14}
            running={startCounting}
            onFinish={() => setIsFinish(true)}
            digitStyle={{ backgroundColor: BackGround }}
            digitTxtStyle={{ color: TextColorDark }}
            timeToShow={["H", "M", "S"]}
            timeLabels={{ m: "", s: "" }}
          />
        ),
    });
  }, [startCounting, isFinish, isRiview]);

  return quizStart ? (
    <QuizStart
      level={level}
      jumlahSoal={DB.length}
      onPress={() => {
        if (count === 0) {
          alert("atur waktu");
          return;
        }
        setTimer(count);
        setStartCounting(true);
        setQuizStart(false);
        setTotalWaktuPengerjaanQuiz(Date.now());
      }}
      title={title}
      setTimer={setCount}
      timer={count}
    />
  ) : isFinish ? (
    <Finish
      progress={grade.benar / DB.length}
      percent={((grade.benar / DB.length) * 100).toFixed(0)}
      grade={grade}
      totalSoal={DB.length}
      waktuPengerjaan={totalWaktuPengerjaanQuiz}
      onPress={() => {
        setIsRiview(true);
        setIsFinish(false);
        setProgres(1 / DB.length);
        setCurrentIndex(0);
      }}
    />
  ) : (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          marginTop: heightSize("2%"),
          alignItems: "center",
        }}
      >
        <View style={styles.progressContainer}>
          <TextPrimary style={{ paddingRight: widthPercentage(2) }}>
            {`${currentIndex + 1} / ${DB.length}`}
          </TextPrimary>
          <ProgressBar progress={progres} />
          {userPressLikeButton ? (
            <AntDesign
              name="heart"
              size={25}
              color={colorPink}
              style={{
                width: widthPercentage(15),
                paddingLeft: widthPercentage(5),
              }}
              onPress={likeButtonOnClick}
            />
          ) : (
            <AntDesign
              name="hearto"
              size={25}
              color={colorPink}
              style={{
                width: widthPercentage(15),
                paddingLeft: widthPercentage(5),
              }}
              onPress={likeButtonOnClick}
            />
          )}

          <Entypo
            name="share"
            size={24}
            color={colorLight}
            style={{ paddingLeft: widthPercentage(2) }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <BannerAdd size="banner" />
        </View>

        {/* questions */}

        <View style={{ marginTop: heightSize("10%") }}>
          {isUsingMath ? (
            <MathSymbol symbol={question} />
          ) : (
            <TextParagraph>{question}</TextParagraph>
          )}
        </View>

        {isRiview && (
          <View style={{ marginTop: heightSize("5%") }}>
            <TextPrimary style={{ marginBottom: heightSize("1%") }}>
              Pembahasan :
            </TextPrimary>

            {isUsingMath ? (
              <MathSymbol symbol={pembahasan} />
            ) : (
              <TextParagraph>{pembahasan}</TextParagraph>
            )}
          </View>
        )}

        {/* choices field   */}

        <View style={styles.radioButtonContainer}>
          {!isRiview ? (
            <ButtonField
              isUsingMath={isUsingMath}
              answer={answer}
              index={currentIndex}
              buttonSelect={buttonSelect}
              setButtonSelect={setButtonSelect}
            />
          ) : (
            <ButtonFieldRiview
              isUsingMath={isUsingMath}
              answer={answer}
              index={currentIndex}
              buttonSelect={buttonSelect}
              corectAnswer={corectAnswer}
            />
          )}
        </View>

        {/* modal */}

        {modalVisible && (
          <ModalStyle
            yes={() => {
              setModalVisible(!modalVisible);
              setIsFinish(true);
              setGrade(corection(DB, buttonSelect));
              setStartCounting(!startCounting);
              const totalTime = Date.now() - totalWaktuPengerjaanQuiz;
              setTotalWaktuPengerjaanQuiz(millisToMinutesAndSeconds(totalTime));
            }}
            no={() => setModalVisible(!modalVisible)}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            btnBackTitle={"Koreksi ulang"}
            btnNextTitle={"Kumpulkan"}
          />
        )}
      </ScrollView>
      <ButtonNavigation next={next} back={back} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scroll: {
    paddingTop: heightSize("1%"),
    paddingLeft: widthSize("3%"),
    paddingRight: widthSize("3%"),
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: widthSize("4%"),
    marginBottom: heightSize("5%"),
  },
  radioButtonContainer: {
    marginVertical: heightSize("3%"),
  },
});
