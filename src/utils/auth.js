export const BASE_URL = 'https://auth.nomoreparties.co';

class Auth {
  constructor(BASE_URL) {
    this._url = BASE_URL;
    this.jwt = localStorage.getItem('jwt');
  }
  
  register ({email, password}) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((response) => {
      try {
        if(response.status === 200) {
          return response.json();
        }
      }
      catch(e) {
        return (e)
      }
    })
    .then((res) => {
      return res
    })
    .catch((err) => console.log(err))
  }
  
  authorization({email, password}) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((response) => {
      try {
        if(response.status === 200) {
          return response.json();
        }
      }
      catch(e) {
        return (e)
      }
    })
    .then((res) => {
      return res
    })
    .catch((err) => console.log(err))
  } 

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
      .catch((err) => console.log(err))
    })
  }
}

const auth = new Auth(BASE_URL);
export default auth;