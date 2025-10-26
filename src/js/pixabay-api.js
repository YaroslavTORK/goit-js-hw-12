import axios from 'axios';

const API_KEY = '52822866-647b6b4c94b7d4074c4dcbe1c'; 

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export async function getImagesByQuery(query, page) {
 const { data } = await api.get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    })
  return data;
}


