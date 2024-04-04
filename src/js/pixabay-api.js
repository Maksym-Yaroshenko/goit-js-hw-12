export default async function getPixabay(userQuery) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '43152817-de47b6f1b37f4fad093212301',
    q: userQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params}`;

  const res = await fetch(url);
  return res.json();
}
