const AIRTABLE_BASE_URL = "https://api.airtable.com/v0/app9Ylybbbvc5URfR";
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search?";
const GIPHY_CONFIG =
  "limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
const GIPHY_TOKEN = import.meta.env.VITE_GIPHY_TOKEN;

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

async function fetchGiphy(word) {
  const response = await fetch(
    `${GIPHY_BASE_URL}api_key=${GIPHY_TOKEN}&q=${word}&${GIPHY_CONFIG}`
  );
  const jsonData = await response.json();
  const url = jsonData.data[0].images.fixed_height.url;

  return url;
}

export { fetchAirTableWords, updateAirTableWords, fetchGiphy };
