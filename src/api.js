import axios from 'axios';
import { mockCities, mockEvents } from './mock-data';

function saveTokens(tokenInfo) {
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  const lastSavedTime = localStorage.getItem('last_saved_time');

  // If there is access_token and the token has not expired yet
  // By default a token life time is one hour = 3600000 milliseconds
  if (accessToken && (Date.now() - lastSavedTime < 3600000)) { // less than one hour
    return accessToken; // After return statement, the code below will not be executed
  }
  // If the access_token is expired, we try to refresh it by using refresh_token
  const refreshToken = localStorage.getItem('refresh_token');

  if (refreshToken) {
    const REFRESH_URL = 'https://c5usrytrsg.execute-api.eu-central-1.amazonaws.com/dev/api/refresh/'
      + refreshToken;
    const tokenInfo = await axios.get(REFRESH_URL);
    saveTokens(tokenInfo);
    return tokenInfo.data.access_token;
  }

  // If there is no refresh_token stored, we can use the authorization code from the url
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');

  if (code) {
    const TOKEN_URL = 'https://c5usrytrsg.execute-api.eu-central-1.amazonaws.com/dev/api/token/'
      + code;
    const tokenInfo = await axios.get(TOKEN_URL);
    saveTokens(tokenInfo);
    return tokenInfo.data.access_token;
  }

  // If we don't have any code, we need to redirect user to get it
  window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=59m4fh64fvor80i00f25e5ia7c&response_type=code&redirect_uri=https://mvtuong.github.io/meetup/';
  return null;
}


async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockCities;
  }

  const token = await getAccessToken();
  if (token) {
    const URL = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
      + query
      + '&access_token=' + token;
    const result = await axios.get(URL);
    return result.data;
  }
  return [];
}


async function getUpcomingEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents;
  }

  let filter = '';
  if (lat) {
    filter += '&lat=' + lat;
  }
  if (lon) {
    filter += '&lon=' + lon;
  }
  if (page) {
    filter += '&page=' + page;
  }

  const token = await getAccessToken();
  if (token) {
    const URL = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
      + filter
      + '&access_token=' + token;
    const result = await axios.get(URL);
    return result.data.events;
  }
  return [];
}

export { getSuggestions, getUpcomingEvents };
