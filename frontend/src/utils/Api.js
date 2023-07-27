import { connectionSettings } from "./constants";
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //проверка статуса ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
  }

  //получение данных пользователя

  getUserInfo() {
    return this._request("/users/me", {
      headers: this._headers,
    });
  }

  //редактирование данных пользователя
  patchProfile(userData) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  //редактирование автара
  patchAvatar(data) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  //получение карточек с сервера
  getInitialCards() {
    return this._request("/cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  //добавление карточки
  postCard(cardData) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.linkImage,
      }),
    });
  }

  //удаление карточки
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //ставит лайк
  _putLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  //удаляет лайк
  _deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._deleteLike(cardId) : this._putLike(cardId);
  }
}
export const api = new Api(connectionSettings);
