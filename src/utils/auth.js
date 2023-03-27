export const BASE_URL = 'https://auth.nomoreparties.co';
  
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password}),
  })
  .then(response => response.ok ? Promise.reject(`${response.ok}`) : response.json() )
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email,password})
  })
  .then(response => response.ok ? response.json() : Promise.reject(`${response.ok}`))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
}; 

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => response.ok ? response.json() : Promise.reject(`${response.ok}`))
  .then(data => data)
  .catch((err) => console.log(err));
}