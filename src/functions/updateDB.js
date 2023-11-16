import cleanWord from "./cleanWord";
import { updateAirTableWords } from "./apiCalls";

const AIRTABLE_BASE_URL = "https://api.airtable.com/v0/app9Ylybbbvc5URfR";
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

const DICTIONARY_BASE_URL =
  "https://www.dictionaryapi.com/api/v3/references/spanish/json";
const DICTIONARY_TOKEN = import.meta.env.VITE_DICTIONARY_TOKEN;
// https://www.dictionaryapi.com/api/v3/references/spanish/json/language?key=your-api-key

async function fetchAllWords() {
  const response = await fetch(`${AIRTABLE_BASE_URL}/main`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });
  let jsonData = await response.json();
  let arrayData = jsonData.records;
  let offset = jsonData.offset;
  //   console.log(offset);

  let wordsDB = [];
  arrayData.forEach((e) => {
    let word = {};
    word.id = e.id;
    word.word_en = e.fields.word_en;
    wordsDB.push(word);
  });

  //   console.log(wordsDB.length);

  //fetch next pages
  while (offset) {
    const response = await fetch(`${AIRTABLE_BASE_URL}/main?offset=${offset}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });
    jsonData = await response.json();
    arrayData = jsonData.records;
    offset = jsonData.offset;

    arrayData.forEach((e) => {
      let word = {};
      word.id = e.id;
      word.word_en = e.fields.word_en;
      wordsDB.push(word);
    });
    // console.log(wordsDB.length);
  }

  return wordsDB;
  //   [{id:xxx, word_en:xxx}]
}

async function fetchSpanish(word) {
  console.log(word);
  const response = await fetch(
    `${DICTIONARY_BASE_URL}/${word}?key=${DICTIONARY_TOKEN}`
  );
  const jsonData = await response.json();
  const firstData = jsonData[0];
  const detailData = firstData.def[0].sseq[0][0][1].dt;

  const wordData = {};
  wordData.functional_label = firstData.fl;

  for (const e of detailData) {
    if (wordData.word_sp && wordData.sentence && wordData.gender_label) {
      break;
    } else {
      if (e[0] === "text" && !wordData.word_sp) {
        wordData.word_sp = cleanWord(e[1]);
      } else if (e[0] === "vis" && !wordData.sentence) {
        wordData.sentence = JSON.stringify(e[1][0]);
      } else if (e[0] === "gl" && !wordData.gender_label) {
        wordData.gender_label = e[1][0];
      }
    }
  }
  return wordData;
}

async function refreshDB() {
  const wordsDB = await fetchAllWords();
  console.log(wordsDB.length);
  let cnt = 0;
  for (const word of wordsDB) {
    const translatedDB = await fetchSpanish(word.word_en);
    cnt += 1;
    updateAirTableWords(word.id, translatedDB);
    console.log(cnt);
  }
}

export { refreshDB };
