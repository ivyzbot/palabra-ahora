function cleanWord(word) {
  const regex = /{bc}|a_link|,| |{|}|\|/g;
  return word.replace(regex, "");
}

export default cleanWord;
