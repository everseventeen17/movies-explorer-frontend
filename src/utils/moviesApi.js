class MoviesApi {
  _handleResponseCheck(res) {
    const result = res.json();
    return res.ok ? result : result.then((err) => Promise.reject(`Ошибка: ${err.message}`));
  }

  getCards() {
    return fetch("https://api.nomoreparties.co/beatfilm-movies", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponseCheck);
  }
}
const moviesApi = new MoviesApi();

export default moviesApi;
