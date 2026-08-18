import axios from 'axios';

// const randomId = Math.round(Math.random() * 100);
// console.log(randomId);

// Приклад
// const instance = axios.create({
//   baseURL: 'http://localhost:3000',
//   // timeout: 1000,
//   // headers: { 'X-Custom-Header': 'foobar' },
//   // params: {
//   //   token: 'myToken',
//   // },
// });

const axios1 = axios.create({
  baseURL: 'http://localhost:3000',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
  // params: {
  //   token: 'myToken',
  // },
});

export function getAllCars() {
  return axios1.get('/cars').then(res => res.data);
}

export function getCar(id) {
  return axios1.get(`/cars/${id}`).then(res => res.data);
}

export function createCar(car) {
  return axios1.post('/cars', car).then(res => res.data);
}

export function updateCar(id, car) {
  return axios1.patch(`/cars/${id}`, car).then(res => res.data);
}

export function resetCar(id, car) {
  return axios1.put(`/cars/${id}`, car).then(res => res.data);
}

export function deleteCar(id) {
  return axios1.delete(`/cars/${id}`).then(res => res.data);
}

// .then(res => res.data) - це для того щоб отримувати чисті дані, у axios вони зберігаються в .data а у fetch .json().
