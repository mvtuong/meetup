import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';

class App extends Component {
  state = {
    events: [],
  }

  render() {
    return (
      <div className="App">
        <CitySearch />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
