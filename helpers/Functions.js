const corection = (DB, buttonSelect) => {
  let benar = 0;
  let salah = 0;
  let kosong = 0;
  let i = 0;
  for (i; i <= DB.length - 1; i++) {
    const isTrue =
      buttonSelect[i] !== undefined && buttonSelect[i] === DB[i].corectAnswer;
    const isFalse =
      buttonSelect[i] !== undefined && buttonSelect[i] !== DB[i].corectAnswer;
    if (isTrue) {
      benar += 1;
    } else if (isFalse) {
      salah += 1;
    } else {
      kosong += 1;
    }
  }
  return { benar, salah, kosong };
};

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export { corection, millisToMinutesAndSeconds };

