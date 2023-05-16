import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '35107875-0af5883f359969caac6a8f266';

export async function fetchImages(query, page) {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}


