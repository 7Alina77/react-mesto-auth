export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = response => response.ok ? response.json() : Promise.reject(`${response.status}`);
  
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password}),
  })
  .then(response => checkResponse(response))
  .then((res) => {
    return res;
  })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email,password})
  })
  .then(response => checkResponse(response))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
}; 

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => checkResponse(response))
  .then(data => data)
}