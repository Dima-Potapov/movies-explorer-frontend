import { LS_JWT, usersApiBaseUrl } from './const';

class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._headers = {
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

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this.#getHeaders(),
            credentials: 'include',
        })
            .then(this.#checkResponse);
    }

    editUserData({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this.#getHeaders(),
            body: JSON.stringify({
                name,
                email
            })
        })
            .then(this.#checkResponse);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: this.#getHeaders(),
        })
          .then(this.#checkResponse);
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this.#getHeaders(),
            body: JSON.stringify(movie)
        })
          .then(this.#checkResponse);
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.#getHeaders(),
        })
          .then(this.#checkResponse);
    }

    #getHeaders() {
        const token = localStorage.getItem(LS_JWT);

        return {
            ...this._headers,
            'Authorization': `Bearer ${token}`,
        }
    }
}

export const mainApi = new MainApi(usersApiBaseUrl);
