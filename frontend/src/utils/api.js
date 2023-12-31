class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _getData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  }
  _request(url, options) {
    return fetch(url, options).then(this._getData);
  }
  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    });
  }
  getUserDetails() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    });
  }
  changeUserDetails(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  changeUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
  addNewCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }
  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    });
  }

  addLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    });
  }

  deleteLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    });
  }
}

const api = new Api({
  url: "https://api.mesto.myrrh.ru",
  headers: {
    Accept: "application/json",
    "content-type": "application/json; charset=UTF-8",
  },
});

export default api;
