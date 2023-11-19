import axios from 'axios';
import { API_KEY } from '../ApiKey/ApiKey';

export async function funSearch(value, page) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: page,
        q: value,
      },
    })
    .then(response => response.data)
    .catch(error => window.alert(error.message));
}
