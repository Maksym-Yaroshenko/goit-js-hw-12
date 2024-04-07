import axios from 'axios';

export default async function getPixabay(userQuery, currentPage) {
  const url = 'https://pixabay.com/api/';

  const params = {
    key: '43152817-de47b6f1b37f4fad093212301',
    q: userQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 15,
  };

  const res = await axios.get(url, { params });
  return res.data;
}
