async function getSuggestions(query) {
  return [
    {
      city: 'Munich',
      country: 'de',
      localized_country_name: 'Germany',
      name_string: 'Munich, Germany',
      zip: 'meetup3',
      lat: 48.14,
      lon: 11.58
    },
    {
      city: 'Munich',
      country: 'us',
      localized_country_name: 'USA',
      state: 'ND',
      name_string: 'Munich, North Dakota, USA',
      zip: '58352',
      lat: 48.66,
      lon: -98.85
    }
  ];
}

export { getSuggestions };
