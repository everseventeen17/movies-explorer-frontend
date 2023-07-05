class MainApi {
_handleResponseCheck(res) {
    const result = res.json();
    return res.ok ? result : result.then((err) => Promise.reject(`Ошибка: ${err.message}`));
  }

  postRegister({password, email, name}) {
    return fetch("https://api.movie1337.nomoredomains.rocks/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email, name})
    })
      .then(this._handleResponseCheck);
  }

  postAuth({password, email}) {
    return fetch("https://api.movie1337.nomoredomains.rocks/signin", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, email})
    })
      .then(this._handleResponseCheck);
  }

  getUserInfo() {
    return fetch("https://api.movie1337.nomoredomains.rocks/users/me", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._handleResponseCheck);
  }

  patchUserInfo({email, name}) {
    return fetch("https://api.movie1337.nomoredomains.rocks/users/me", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({name, email})
    })
      .then(this._handleResponseCheck);
  }

  getCardsByOwner() {
    return fetch("https://api.movie1337.nomoredomains.rocks/movies", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._handleResponseCheck);
  }

  postSavedCard({
                  country,
                  director,
                  duration,
                  year,
                  description,
                  image,
                  trailerLink,
                  thumbnail,
                  movieId,
                  nameRU,
                  nameEN,
                }) {
    return fetch("https://api.movie1337.nomoredomains.rocks/movies", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    })
      .then(this._handleResponseCheck);
  }

  deleteSavedCard(id) {
    return fetch(`https://api.movie1337.nomoredomains.rocks/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(this._handleResponseCheck);
  }
}
const mainApi = new MainApi();

export default mainApi;
