# Palabra Ahora
### 🌟 Your Gateway to Spanish Vocabulary Mastery! 🌟
Palabra Ahora, or **Word Now** in English, is a platform for Spanish enthusiasts to expand their vocabulary. Users will start with a glossary of 100 most-frequently used words, but they can search for any new word they want. They can also review all the words in the glossary to assess their mastery of the vocabulary and chanllenge themselves by playing word-searching games. Interesting Gifs are used to enhance their memory of the words. ¡Vamos! Let's unlock the doors to a world of words together!

## User Journey
- **Learn Page**
1) Users can choose to generate a list of random words to learn (Words get from AirTable). They can toggle the review button to mark the word as "mastered" or "for later review" (sync to AirTable).
<img width="1432" alt="image" src="https://github.com/ivyzbot/palabra-ahora/assets/10040970/742a4aab-cbbf-454b-9366-db1ae5f89439">

2) Or search for any words they want to learn (Search AirTable for the word first. If the word doesn't exist, call MW Dictionary API and Giphy API). For new word, they can choose to add it into the glossary (sync to AirTable).
<img width="1436" alt="image" src="https://github.com/ivyzbot/palabra-ahora/assets/10040970/cdda42e7-75ba-473c-8869-aa412bf7206f">

- **Review Page**
1) The control panel on the top displays the number of words in the glossary, total and by review category (Words get from AirTable).
2) Users can hover over the card to see the translation.
3) Users can also switch the language mode from EN-SP to SP-EN.
<img width="1411" alt="image" src="https://github.com/ivyzbot/palabra-ahora/assets/10040970/377ecbca-e7e9-4a5a-90ea-74b6175bf17b">

- **Test Page**
1) Click "Generate Board" button to generate a random word board. (Words get from AirTable)
<img width="1432" alt="image" src="https://github.com/ivyzbot/palabra-ahora/assets/10040970/fffe3ddb-8131-44f9-9ea3-c8326c9e7dd0">
2) Find out the 3 Spanish words!
<img width="1433" alt="image" src="https://github.com/ivyzbot/palabra-ahora/assets/10040970/3a01a9d3-1da6-489c-882b-83b8fe35d10b">

## Technologies Used
- React, JS, CSS, HTML
- Tailwindcss, DaisyUI
- APIs:
    - Merriam-Webster Spanish-English Dictionary API: https://dictionaryapi.com/products/api-spanish-dictionary
    - Giphy API: https://developers.giphy.com/explorer/
    - AirTable: https://airtable.com/app9Ylybbbvc5URfR/tblrB9qpZxh0xf2ar/viwWbJ83xzEhagn8H?blocks=hide

## Code Snippet
1) Example of CRUD operations using AirTable
- Fetch:
```Javascript
async function fetchAirtableWordsRandom(numWords, setResult) {
  const response = await fetch(`${AIRTABLE_BASE_URL}/summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });

  const jsonData = await response.json();
  const records = jsonData.records[0].fields.records;
  const idxArray = Array.from(Array(records).keys());
  const shuffledArray = idxArray.sort(() => 0.5 - Math.random());
  const selectedIdx = shuffledArray.slice(0, numWords);

  let words = [];
  for (let i = 0; i < selectedIdx.length; i++) {
    const response = await fetch(
      `${AIRTABLE_BASE_URL}/main?filterByFormula={SN}="${selectedIdx[i] + 1}"`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        },
      }
    );
    const jsonData = await response.json();
    words.push(jsonData.records[0]);
  }

  // console.log(words);
  setResult(words);
  return words;
}
```

- PATCH
```Javascript
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
```

3) useState and lifting state
```JavaScript
export default function LearnPage() {
  const [numWords, setNumWords] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  return (
    <>
      <SearchBar setNumWords={setNumWords} setSearchWord={setSearchWord} />
      <RandomCards numWords={numWords} searchWord={searchWord} />
      <SearchCard searchWord={searchWord} numWords={numWords} />
    </>
  );
}
```

## Key challenges
- Data cleaning involved in MW Dictionary API
- Logics to randomly select words from AirTable

## Future Enhancement
- Code refactoring
- New feature to allow users to delete words

## Reference
Searchword board generating logic is inspired by https://github.com/umairayub79/WordSearchGenerator
