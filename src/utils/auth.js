export const BASE_URL = 'https://auth.nomoreparties.co';
  
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password}),
  })
  .then((response) => {
    response.status === 400 || response.ok ? response.json() : Promise.reject(`${response.status}`)
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email,password})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', JSON.stringify(data.token));
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
  .then(res => res.json())
  .then(data => data)
  .catch((err) => console.log(err));
}