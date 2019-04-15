import React, { Component } from 'react';
import { getSuggestions } from './api';

class CitySearch extends Component {
  state = {
    input: '',
    suggestions: [],
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ input: value });
    getSuggestions(value).then(suggestions => this.setState({ suggestions }));
  }

  handleSuggestionClicked = (text, lat, lon) => {
    this.setState({ input: text, suggestions: [] });
    this.props.updateCity(lat, lon);
  }

  render() {
    const listCities = this.state.suggestions.map((suggestion) =>
      <li key={suggestion.name_string} onClick={() => this.handleSuggestionClicked(suggestion.name_string, suggestion.lat, suggestion.lon)}>
        {suggestion.name_string}
      </li>
    );

    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.input}
          onChange={this.handleInputChanged}
          placeholder="City"
        />
        <ul className="suggestions">
          {listCities}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
