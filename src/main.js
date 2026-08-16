import { getAllCars } from './js/carsAPI';

const refs = {
  carListElem: document.querySelector('.cars-list'),
};

getAllCars().then(data => {
  const markup = carsTemplate(data);
  refs.carListElem.innerHTML = markup;
});

function carTemplate(car) {
  const { model, year } = car;
  return `<li>
        <p>Model: ${model}</p>
        <p>Year: ${year}</p>
      </li>`;
}

function carsTemplate(arr) {
  return arr.map(carTemplate).join('');
}

// function getAllCars() {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = '/cars';

//   const params = new URLSearchParams({});

//   const url = `${BASE_URL}${END_POINT}`;

//   const options = {
//     headers: {},
//   };
//   return fetch(url, options).then(res => {
//     // console.log(res);
//     return res.json();
//   });
// }

// getAllCars().then(cars => {
//   console.log(cars);
// });

// //!========================================================

// function createCars(carObj) {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = '/cars';

//   const params = new URLSearchParams({});

//   const url = `${BASE_URL}${END_POINT}`;

//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(carObj),
//   };
//   return fetch(url, options).then(res => res.json());
// }

// // createCars({ model: 'Accent', year: 2007 });

// //!=========================================================

// import axios from 'axios';
// import { ContainerWithChildren } from 'postcss/lib/container';

// function createCar(carObj) {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = '/cars';

//   const url = `${BASE_URL}${END_POINT}`;

//   // const params = new URLSearchParams({});

//   const params = {};
//   const headers = {};

//   return axios.post(url, carObj, { params, headers });
// }

// // createCar({ model: 'Vaz-2101', year: 1986 });

// // ==========================================================

// function updateCar(id, car) {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = `/cars/${id}`;

//   const url = `${BASE_URL}${END_POINT}`;

//   // const params = new URLSearchParams({});

//   const params = {};
//   const headers = {};

//   return axios.patch(url, car, { params, headers });
// }

// // updateCar('ARgXwvcuNMg', { year: 1990 });

// // ==========================================================

// function resetCar(id, car) {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = `/cars/${id}`;

//   const url = `${BASE_URL}${END_POINT}`;

//   // const params = new URLSearchParams({});

//   const params = {};
//   const headers = {};

//   return axios.put(url, car, { params, headers });
// }

// // resetCar('ARgXwvcuNMg', { year: 1991 });

// // ===========================================================

// function removeCar(id) {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = `/cars/${id}`;

//   const url = `${BASE_URL}${END_POINT}`;

//   // const params = new URLSearchParams({});

//   const params = {};
//   const headers = {};

//   return axios.delete(url);
// }

// // removeCar('ARgXwvcuNMg');

// // =============================================================

// function getAllCars2() {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = '/cars';

//   // const params = new URLSearchParams({});

//   const params = {};
//   const headers = {};

//   const url = `${BASE_URL}${END_POINT}`;

//   return axios.get(url);
// }

// getAllCars2().then(data => {
//   console.log(data.data);
// });

// // =============================================================

// function getCar(id) {
//   const BASE_URL = 'http://localhost:3000';
//   const END_POINT = `/cars/${id}`;

//   // const params = new URLSearchParams({});

//   const params = {};
//   const headers = {};

//   const url = `${BASE_URL}${END_POINT}`;

//   return axios.get(url);
// }

// getCar('fghq6YYOZag')
//   .then(data => {
//     console.log(data.data);
//   })
//   .catch();
