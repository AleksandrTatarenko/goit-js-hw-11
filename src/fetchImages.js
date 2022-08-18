const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/?key=29260486-d8b85945fd4ab908f9057b328';

async function getTodoItems(tag, page) {
try {
  const response = await axios.get(`${BASE_URL}&q=${tag}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
const todoItems = response.data;
return todoItems;
} catch (errors) {
console.error(errors);
}
};

export default { getTodoItems }