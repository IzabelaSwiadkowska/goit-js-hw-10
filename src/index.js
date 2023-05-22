/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function clear() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
function infoTooManyResults() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
function alertNoMatch() {
  Notify.failure('Oops, there is no country with that name');
}
function renderCountryList(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class="countrylist__item">
      <img src="${flags.svg}" alt="Flag of ${name.official}" width="40" height="30">
         <p>${name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `
      <div class="country-info__img">
      <img src="${flags.svg}" alt="Flag of ${
        name.official
      }" width="40" height="30">
         <h2>${name.official}</h2></div>
        <ul class="country-info__list">
            <li class="country-info__item"><b>Capital</b>: ${capital}</li>
            <li class="country-info__item"><b>Population</b>: ${population}</li>
            <li class="country-info__item"><b>Languages</b>: ${Object.values(
              languages
            ).join(', ')} </li>
             </ul>  `;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
input.addEventListener(
  'input',
  debounce(e => {
    const inputValue = input.value.trim();
    clear();
    if (inputValue !== '') {
      fetchCountries(inputValue)
        .then(data => {
          if (data.length > 10) {
            infoTooManyResults();
          } else if (data.length >= 2) {
            renderCountryList(data);
          } else if (data.length === 1) {
            renderOneCountry(data);
          }
        })
        .catch(() => alertNoMatch());
    }
  }, DEBOUNCE_DELAY)
);
