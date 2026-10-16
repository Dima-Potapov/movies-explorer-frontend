import { searchMoviesApiBaseUrl } from './const';

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  #checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  async getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`)
      .then(this.#checkResponse);
  }
}

export const moviesApi = new MoviesApi(searchMoviesApiBaseUrl);
