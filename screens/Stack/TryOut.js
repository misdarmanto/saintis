import React, { useCallback, useState, useEffect, useContext } from "react";
import ModalStyle from "../../components/Modal";
import ProgressBar from "../../components/Progress";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonNavigation from "../../components/Buttonscomponent/ButtonNavigation";
import ButtonField from "../../components/Buttonscomponent/ButtonField";
import ButtonFieldRiview from "../../components/Buttonscomponent/ButtonFieldContainer";
import { corection } from "../../helpers/Functions";
import { TextColorDark, BackGround } from "../../Global/Color";
import MathSymbol from "../../components/MathSymboles";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import TextParagraph from "../../components/Text/TextParagraph";
import { millisToMinutesAndSeconds } from "../../helpers/Functions";
import {
  colorLight,
  colorPink,
  colorSecondary,
} from "../../assets/Colors/Colors";
import { widthPercentage, heightPercentage } from "../../Global/Dimensions";
import { heightSize, widthSize } from "../../helpers/layoutDimension";
import Layout from "../../Global/Layout";
import TextPrimary from "../../components/Text/TextPrimary";
import TryoutStart from "../../components/TryoutStart";
import TryOutFinish from "../../components/TryOutFinish";

const TryOut = ({ route }) => {
  const [indexDocument, setIndexDocumnet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonSelect, setButtonSelect] = useState({});
  const [isRiview, setIsRiview] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [grade, setGrade] = useState({});
  const [quizStart, setQuizStart] = useState(true);

  const { data, tryOutInfo } = route.params;
  const { category, isNewItem, likes, title, usingMath, views } =
    data[indexDocument].meta;
  const { answer, correctAnswer, pembahasan, question } =
    data[indexDocument].soal[currentIndex];
  const lenthData = data[indexDocument].soal.length;
  const navigation = useNavigation();
  const [progres, setProgres] = useState(1 / lenthData);
  const [timer, setTimer] = useState(tryOutInfo.jumlahSoal);

  const next = useCallback(() => {
    if (currentIndex === lenthData - 1) {
      if (!isRiview) {
        setModalVisible(true);
      }
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setProgres(progres + 1 / lenthData);
  }, [currentIndex]);

  const back = useCallback(() => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
    setProgres(progres - 1 / lenthData);
  }, [currentIndex]);

  const nextDocument = useCallback(() => {
    if (indexDocument === data.length - 1) {
      setIsFinish(true);
      return;
    }
    setIndexDocumnet(indexDocument + 1);
    setCurrentIndex(0);
    setProgres(1 / lenthData);
  }, [indexDocument]);

  useEffect(() => {
    // if (isFinish) setGrade(corection(DB, buttonSelect));
    setTimer(tryOutInfo.jumlahSoal);
    navigation.setOptions({
      headerRight: () =>
        !quizStart && (
          <CountDown
            until={60 * timer}
            size={14}
            running={true}
            onFinish={() => alert("finish")}
            digitStyle={{ backgroundColor: BackGround }}
            digitTxtStyle={{ color: TextColorDark }}
            timeToShow={["H", "M", "S"]}
            timeLabels={{ m: "", s: "" }}
          />
        ),
      headerLeft: () => !quizStart && <TextPrimary>{title}</TextPrimary>,
    });
  }, [quizStart, indexDocument]);

  return quizStart ? (
    <TryoutStart
      title={tryOutInfo.title}
      jumlahSoal={tryOutInfo.jumlahSoal}
      timer={timer}
      setTimer={setTimer}
      onPress={() => setQuizStart(false)}
    />
  ) : isFinish ? (
    <TryOutFinish />
  ) : (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar progress={progres} />
          <TextPrimary style={{ paddingLeft: widthPercentage(2) }}>
            {`${currentIndex + 1} / ${lenthData}`}
          </TextPrimary>
        </View>

        {/* questions */}

        <View style={{ marginTop: heightSize("10%") }}>
          <MathSymbol symbol={question} />
        </View>

        {isRiview && (
          <View style={{ marginTop: heightSize("5%") }}>
            <TextPrimary style={{ marginBottom: heightSize("1%") }}>
              Pembahasan :
            </TextPrimary>
            <MathSymbol symbol={pembahasan} />
          </View>
        )}

        {/* choices field   */}

        <View style={styles.radioButtonContainer}>
          {!isRiview ? (
            <ButtonField
              isUsingMath={usingMath}
              answer={answer}
              index={currentIndex}
              buttonSelect={buttonSelect}
              setButtonSelect={setButtonSelect}
            />
          ) : (
            <ButtonFieldRiview
              isUsingMath={usingMath}
              answer={answer}
              index={currentIndex}
              buttonSelect={buttonSelect}
              corectAnswer={corectAnswer}
            />
          )}
        </View>
        {modalVisible && (
          <ModalStyle
            yes={() => {
              nextDocument();
              setModalVisible(!modalVisible);
            }}
            no={() => setModalVisible(!modalVisible)}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            btnBackTitle={"Koreksi ulang"}
            btnNextTitle={"Lanjutkan"}
          />
        )}
      </ScrollView>
      <ButtonNavigation next={next} back={back} />
    </Layout>
  );
};

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

export default TryOut;
