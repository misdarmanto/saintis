import React from "react";
import RadioButton from "./RadioButton";

const ButtonFieldRiview = (props) => {
  const { answer, corectAnswer, buttonSelect, index, isUsingMath } = props;
  const Element = [];
  const letter = ["A", "B", "C", "D"];
  let i = 0;
  for ( i; i < 4; i++) {
    Element.push(
      <RadioButton
        key={i}
        primary={letter[i] === corectAnswer}
        secondary={
          letter[i] === buttonSelect[index] &&
          buttonSelect[index] !== corectAnswer
        }
        letter={letter[i]}
        value={answer[letter[i]]}
        isUsingMath={isUsingMath}
      />
    );
  }
  return <>{Element}</>;
};

export default ButtonFieldRiview;
