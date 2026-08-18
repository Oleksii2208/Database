import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createCar,
  deleteCar,
  getAllCars,
  resetCar,
  updateCar,
} from './js/carsAPI';

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  onOpening: function () {
    console.log('callback abriu!');
  },
  onClosing: function () {
    console.log('callback fechou!');
  },
});

const refs = {
  createFormElem: document.querySelector('.js-create-form'),
  updateFormElem: document.querySelector('.js-update-form'),
  resetFormElem: document.querySelector('.js-reset-form'),
  removeFormElem: document.querySelector('.js-delete-form'),
  carListElem: document.querySelector('.cars-list'),
};

refs.createFormElem.addEventListener('submit', handleCreateCar);
refs.updateFormElem.addEventListener('submit', handleUpdateCar);
refs.resetFormElem.addEventListener('submit', handleResetCar);
refs.removeFormElem.addEventListener('submit', handleRemoveCar);

// -----------------------------------------------------------------------

function handleCreateCar(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  // const data = Object.fromEntries(formData.entries()); // Можна зібрати так дані з форми, але так не назви будуть з форми нейм, тому:

  const data = {};
  for (const [key, value] of formData.entries()) {
    const newKey = key.slice(3).toLowerCase();
    data[newKey] = value;
  }

  createCar(data).then(newCar => {
    const markup = carTemplate(newCar);
    refs.carListElem.insertAdjacentHTML('afterbegin', markup);
  });

  e.target.reset();
}

// -----------------------------------------------------------------------

function handleUpdateCar(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  // const data = Object.fromEntries(formData.entries()); // Можна зібрати так дані з форми, але так не назви будуть з форми нейм, тому:

  const id = e.target.elements.carId.value;
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (!value.trim()) continue; // Для того щоб не змінювати ті поля які я не планую оновлювати, тобто якщо value порожнє перейди до наступного поля;
    const newKey = key.slice(3).toLowerCase();
    data[newKey] = value;
  }

  updateCar(id, data)
    .then(newCar => {
      const markup = carTemplate(newCar);
      const oldCar = document.querySelector(`[data-id='${id}']`); // знаходжу старий авто по id;
      console.log(oldCar);
      oldCar.insertAdjacentHTML('beforebegin', markup); //вставляю біля старого авто новий

      oldCar.remove(); // А старе авто видаляю
    })
    .catch(error => {
      iziToast.error({
        title: 'Sorry',
        message: `${error}`,
      });
    });

  e.target.reset();
}

// -----------------------------------------------------------------------

function handleResetCar(e) {
  e.preventDefault();

  const id = e.target.elements.carId.value;
  const data = {
    model: e.target.elements.carModel.value,
    year: e.target.elements.carYear.value,
    owner: e.target.elements.carOwner.value,
  }; // Ще один метод отримати дані з полів але він зручний коли в мене не багато полів

  resetCar(id, data)
    .then(newCar => {
      const markup = carTemplate(newCar);
      const oldCar = document.querySelector(`[data-id='${id}']`); // знаходжу старий авто по id;
      console.log(oldCar);
      oldCar.insertAdjacentHTML('beforebegin', markup); //вставляю біля старого авто новий

      oldCar.remove(); // А старе авто видаляю
    })
    .catch(error => {
      iziToast.error({
        title: 'Sorry',
        message: `${error}`,
      });
    });

  e.target.reset();
}

// -----------------------------------------------------------------------

function handleRemoveCar(e) {
  e.preventDefault();
  const id = e.target.elements.carId.value;

  if (!id) return;

  deleteCar(id)
    .then(() => {
      const oldCar = document.querySelector(`[data-id='${id}']`);
      if (oldCar) {
        oldCar.remove();
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
      });
    });

  e.target.reset();
}

// -----------------------------------------------------------------------

getAllCars().then(data => {
  const markup = carsTemplate(data);
  refs.carListElem.innerHTML = markup;
});

// -----------------------------------------------------------------------

function carTemplate(car) {
  const { model, year, owner, id } = car;
  return `<li data-id='${id}'>
        <p>id: ${id}</p>
        <p>Model: ${model}</p>
        <p>Year: ${year}</p>
        <p>Owner: ${owner}</p>
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
