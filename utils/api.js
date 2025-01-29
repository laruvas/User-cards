// Функция для запроса данных с API
const API_URL = "https://jsonplaceholder.typicode.com/users";


// вот здесь можно найти пример обработки не успешного ответа -- https://habr.com/ru/articles/870774/
export function fetchUsers() {
 
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })

    .catch((err) => {
      console.error("Error fetching users:", err);
      throw err; 
    });
}
