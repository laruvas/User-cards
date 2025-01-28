// Функция для запроса данных с API
const API_URL = "https://jsonplaceholder.typicode.com/users";

// 1. Верните вызов fetch, для доступа к методам Promise в основном файле скрипта
// 2. Обработайте успешный ответ в методе then() -- верните данные в формате json
// 3. Обработайте ошибку (если ответ не получен)
// вот здесь можно найти пример обработки не успешного ответа -- https://habr.com/ru/articles/870774/
 
// Ваш код здесь...
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
