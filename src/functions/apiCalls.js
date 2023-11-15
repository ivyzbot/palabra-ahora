const AIRTABLE_BASE_URL = "https://api.airtable.com/v0/app9Ylybbbvc5URfR";
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

async function fetchAirTableWords(setResult) {
  const response = await fetch(`${AIRTABLE_BASE_URL}/main`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    },
  });
  const jsonData = await response.json();
  setResult(jsonData.records);
}

export { fetchAirTableWords };
