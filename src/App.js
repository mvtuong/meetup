import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import { getUpcomingEvents } from './api';

class App extends Component {
  state = {
    events: [],
    lat: null,
    lon: null,
    page: null,
  }

  componentDidMount() {
    this.updateEvents();
  }

  updateCity = (lat, lon) => {
    this.setState({ lat, lon }, this.updateEvents);
  }

  updateNumberOfEvents = (number) => {
    this.setState({ page: number }, this.updateEvents);
  }

  updateEvents = () => {
    getUpcomingEvents(this.state.lat, this.state.lon, this.state.page).then(events => this.setState({ events }));
  }

  render() {
    return (
      <div className="App">
        <h1>Meetup Events</h1>
        <CitySearch updateCity={this.updateCity} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
