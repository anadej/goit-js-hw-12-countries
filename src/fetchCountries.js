function fetchCountries(searchQuery) {
  const api_url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(api_url).then(res => {
    if (res.status === 404) {
      return Promise.reject('Something went wrong!');
    }
    return res.json();
  });
}

export default fetchCountries;
