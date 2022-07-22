'use strict';

const BASE_URL = `https://mate-academy.github.io/phone-catalogue-static/api`;

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => Promise.reject(
          new Error(`${response.status} - ${response.statusText}`)
        ), 5000);
      }

      return response.json();
    });
};

const getPhones = () => request('/phones.json');
const getPhonesDetails = (arrId) => {
  return Promise.all(arrId.map(id => request(`/phones/${id}.json`)));
};

const list = document.createElement('ul');

getPhones()
  .then(phones => {
    const idList = phones.map(phone => {
      list.insertAdjacentHTML('beforeend', `<li>${phone.id}</li>`);

      return phone.id;
    });

    const details = [];

    getPhonesDetails(idList)
      .then(data => {
        Object.assign(details, data);
      });
  });

document.body.append(list);
