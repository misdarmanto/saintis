import React from "react";
import RadioButton from "./RadioButton";

const ButtonField = (props) => {
  const { answer, index, buttonSelect, setButtonSelect, isUsingMath } = props;
  const Element = [];
  const letter = ["A", "B", "C", "D"];
  for (let i = 0; i < 4; i++) {
    Element.push(
      <RadioButton
        key={i}
        onPress={() => setButtonSelect({ ...buttonSelect, [index]: letter[i] })}
        onSelect={buttonSelect[index] === letter[i] ? true : false}
        letter={letter[i]}
        value={answer[letter[i]]}
        isUsingMath={isUsingMath}
      />
    );
  }
  return <>{Element}</>;
};

export default ButtonField;
