import { authApiBaseUrl } from './const';

class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  #checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._header,
      body: JSON.stringify({password, email, name})
    })
      .then(this.#checkResponse);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._header,
      body: JSON.stringify({password, email})
    })
      .then(this.#checkResponse);
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(this.#checkResponse);
  }

  checkTokenUser = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...this._header,
      }
    })
      .then(this.#checkResponse);
  }
}

export const auth = new Auth(authApiBaseUrl);
