import React, { memo } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { colorPrimary } from "../assets/Colors/Colors";
import { heightSize, widthSize } from "../helpers/layoutDimension";
import TextPrimary from "./Text/TextPrimary";

function ModalStyle(props) {
  const { visible, onRequestClose, yes, no, btnBackTitle, btnNextTitle } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextPrimary style={styles.modalText}>
            Yakin sudah selesai?
          </TextPrimary>

          <View style={styles.modalButton}>
            <Pressable style={styles.button} onPress={no}>
              <Text style={styles.textStyle}>{btnBackTitle}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={yes}>
              <Text style={styles.textStyle}>{btnNextTitle}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: widthSize("8%"),
    marginRight: widthSize("8%"),
    marginBottom: heightSize("15%"),
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "flex-end",
    padding: 10,
    height: heightSize("25%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
    marginBottom: heightSize("2%"),
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colorPrimary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: heightSize("5%"),
    textAlign: "center",
  },
});

export default memo(ModalStyle);
