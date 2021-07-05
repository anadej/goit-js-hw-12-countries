import './sass/main.scss';

import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const container = document.querySelector('.container');
const input = container.querySelector('.search');
const result = container.querySelector('.result');

input.addEventListener('input', debounce(getCountryInfo, 500));

function getCountryInfo(e) {
  result.innerHTML = '';
  const country = e.target.value;
  if (!country) return;

  fetchCountries(country)
    .then(data => {
      if (data.length === 1) {
        renderCountryInfo(data[0]);
      } else if (data.length > 1 && data.length < 11) {
        renderCountryList(data);
      } else {
        error({
          text: 'Too many matches found. Please enter a nore specific query!',
        });
      }
    })
    .catch(err =>
      error({
        text: err,
      }),
    );
}

function renderCountryInfo({ name, capital, population, languages, flag }) {
  const langMarkup = languages.map(lang => `<li class="language">${lang.name}</li>`).join('');

  const markup = `
<h2>${name}</h2>
<div class="info">
<div>
<p><span>Capital:</span> ${capital}</p>
<p><span>Population:</span> ${population}</p>
<p><span>Languages:</span> </p>
<ul>${langMarkup}</ul>
</div>
<img class="flag" src=${flag} alt="Country flag" />
</div>`;

  result.innerHTML = markup;
}

function renderCountryList(data) {
  const liMarkup = data.map(country => `<li class="country">${country.name}</li>`).join('');
  result.innerHTML = `<ul>${liMarkup}</ul>`;
}
