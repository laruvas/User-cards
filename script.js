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
  showLoader();
 clearContainer();

  // Принудительная задержка
setTimeout(() => {
fetchUsers()

 .then(users => {
    users.forEach(user => {
      const userCard = createUser (user);
      userCardsContainer.appendChild(userCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    userCardsContainer.innerHTML =
      "<p style='font-size: 30px; text-align: center;'>Error loading users. Please try again later.</p>";
  })
  .finally(() => {
 hideLoader();
  });
} , "2000")};
 
function resetPage() {
  clearContainer();
  hideLoader();
}

// Обработчик для запроса пользователей с сервера
btnShowUsersCards.addEventListener('click',displayUsers);
// Обработчик для очистки пользователей на странице
btnResetPage.addEventListener('click',resetPage);

