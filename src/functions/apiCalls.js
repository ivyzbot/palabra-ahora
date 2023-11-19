import cleanWord from "./cleanWord";

const AIRTABLE_BASE_URL = "https://api.airtable.com/v0/app9Ylybbbvc5URfR";
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search?";
const GIPHY_CONFIG =
  "limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
const GIPHY_TOKEN = import.meta.env.VITE_GIPHY_TOKEN;

const DICTIONARY_BASE_URL =
  "https://www.dictionaryapi.com/api/v3/references/spanish/json";
const DICTIONARY_TOKEN = import.meta.env.VITE_DICTIONARY_TOKEN;
// https://www.dictionaryapi.com/api/v3/references/spanish/json/language?key=your-api-key

async function fetchAirTableWords(numWords, setResult) {
  const response = await fetch(
    `${AIRTABLE_BASE_URL}/main?pageSize=${numWords}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  const jsonData = await response.json();
  setResult(jsonData.records);
}

async function fetchAllAirTableWords(setResult) {
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
    word.word_sp = e.fields.word_sp;
    word.status = e.fields.status;
    wordsDB.push(word);
  });

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
      word.word_sp = e.fields.word_sp;
      word.status = e.fields.status;
      wordsDB.push(word);
    });
  }
  setResult(wordsDB);
  //   [{id:, word_en:, word_sp:,status}]
}

async function fetchAirTableWordsWithFilter(word) {
  const response = await fetch(
    `${AIRTABLE_BASE_URL}/main?filterByFormula={word_en}="${word}"`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );
  const jsonData = await response.json();
  const records = jsonData.records;
  return records;
}

async function updateAirTableWords(id, fields) {
  const response = await fetch(`${AIRTABLE_BASE_URL}/main/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
    method: "PATCH",
    body: JSON.stringify({ fields: fields }),
  });
  return response;
}

async function createAirTableWord(cardData) {
  let fields = {
    word_en: cardData.word_en,
    word_sp: cardData.word_sp,
    url: cardData.url,
    type: "others",
    status: "mastered",
    summary: ["recGVhngHq2GLa3zL"],
  };
  const response = await fetch(`${AIRTABLE_BASE_URL}/main`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
    method: "POST",

    body: JSON.stringify({ fields: fields }),
  });
  console.log(response.status);
  return response;
}

async function fetchGiphy(word) {
  const response = await fetch(
    `${GIPHY_BASE_URL}api_key=${GIPHY_TOKEN}&q=${word}&${GIPHY_CONFIG}`
  );
  const jsonData = await response.json();
  const url = jsonData.data[0].images.fixed_height.url;

  return url;
}

async function fetchDictionaryAndGiphy(word) {
  if (word === "") {
    return;
  }
  const response = await fetch(
    `${DICTIONARY_BASE_URL}/${word}?key=${DICTIONARY_TOKEN}`
  );
  const jsonData = await response.json();
  const firstData = jsonData[0];
  const detailData = firstData.def[0].sseq[0][0][1].dt;

  const wordData = {};

  for (const e of detailData) {
    if (wordData.word_sp) {
      break;
    } else {
      if (e[0] === "text") {
        wordData.word_sp = cleanWord(e[1]);
      }
    }
  }
  const url = await fetchGiphy(word);
  wordData.url = url;
  wordData.id = 1;
  wordData.word_en = word;
  return wordData;
}

export {
  fetchAirTableWords,
  updateAirTableWords,
  fetchGiphy,
  fetchDictionaryAndGiphy,
  fetchAirTableWordsWithFilter,
  createAirTableWord,
  fetchAllAirTableWords,
};
