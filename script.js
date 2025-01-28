import { fetchUsers } from "./utils/api.js";

const userCardsContainer = document.querySelector("#user-cards");
const btnShowUsersCards = document.querySelector("#btn-show");
const btnResetPage = document.querySelector("#btn-reset");
const loader = document.querySelector("#loader");

// Функция для создания карточки пользователя
function createUser(user) {
  const card = document.createElement("li");
  card.className = "card";

  // Генерация URL для изображения пользователя (используем сервис pravatar)
  // Посмотреть документацию можно здесь https://pravatar.cc/
  const imageUrl = `https://i.pravatar.cc/300${user.id}`;

  // Документация по свойству innerHTML — https://doka.guide/js/element-innerhtml/
  card.innerHTML = 
     `<img src="${imageUrl}" alt="${user.name}'s Avatar" class="card__image">
      <h2 class="card__title">${user.name}</h2>
      <p>email: ${user.email}</p>
      <p><b>nickname</b>: ${user.username}</p>`;
  return card;
}

// Показать лоудер
function showLoader() {
  loader.style.display = "block";

}

// Скрыть лоудер
function hideLoader() {
  loader.style.display = "none";
}

// Очистить содержимое контейнера с карточками
function clearContainer() {
  userCardsContainer.innerHTML = "";
}

// Функция для отображения пользователей
function displayUsers() {
  // 1. Вызовите функцию showLoader, чтобы сделать лоадер видимым перед началом загрузки данных
  showLoader();
  // 2. Вызовите функцию clearContainer для удаления старых карточек пользователей.
 clearContainer();

  // Принудительная задержка
  // 3. Вызовите setTimeout с таймаутом в 2000 миллисекунд
setTimeout(() => {
fetchUsers()
 .then(users => {
    // 5. После получения данных выполните обработку через .then()
    // 5.1. Внутри .then() пройдитесь по массиву пользователей с помощью метода .forEach
    users.forEach(user => {
      // 5.2. Для каждого пользователя вызовите функцию createUser Card(user), чтобы создать карточку.
      const userCard = createUser (user);
      // 5.3. Добавьте карточку в контейнер userCardsContainer с помощью appendChild.
      userCardsContainer.appendChild(userCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    userCardsContainer.innerHTML =
      "<p style='font-size: 30px; text-align: center;'>Error loading users. Please try again later.</p>";
  })
  .finally(() => {
    // 6. Независимо от результата (успех или ошибка), вызовите hideLoader внутри блока .finally():
 hideLoader();
  });
} , "2000")};
 
function resetPage() {
  clearContainer();
  hideLoader();
}

// Обработчик для запроса пользователей с сервера
// 7. Добавьте обработчик события click на кнопку btnShowUsersCards и в качестве коллбэка передайте функцию displayUsers
btnShowUsersCards.addEventListener('click',displayUsers);
// Обработчик для очистки пользователей на странице
// 8. Добавьте обработчик события click на кнопку btnResetPage и в качестве коллбэка передайте функцию resetPage
btnResetPage.addEventListener('click',resetPage);

