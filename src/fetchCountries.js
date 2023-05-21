/* eslint-disable arrow-parens */
/* eslint-disable import/prefer-default-export */

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchOptions = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${searchOptions}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
