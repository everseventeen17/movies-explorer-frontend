import {movieApiLink} from "./constants";
class MoviesApi {
  constructor(link) {
    this._link = link;
  }
  _handleResponseCheck(res) {
    const result = res.json();
    return res.ok ? result : result.then((err) => Promise.reject(`Ошибка: ${err.message}`));
  }

  getCards() {
    return fetch( this._link, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponseCheck);
  }
}
const moviesApi = new MoviesApi(movieApiLink);

export default moviesApi;
