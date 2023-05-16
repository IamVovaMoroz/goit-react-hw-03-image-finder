import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '35107875-0af5883f359969caac6a8f266';

export async function fetchImages(query, page) {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}


// export async function fetchImages(inputData, page) {
//   const searchParams = new URLSearchParams({
//     key: 35107875-0af5883f359969caac6a8f266,
//     q: inputData,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     per_page: 12,
//     page,
//   });
//   const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

//   return images.data;
// }
