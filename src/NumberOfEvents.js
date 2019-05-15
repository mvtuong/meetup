import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }

  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
    if (value < 1) {
      this.setState({ errorText: 'Number should be at least 1' });
    } else {
      this.setState({ errorText: '' });
    }
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.errorText} />
        <span>Show </span>
        <input
          type="number"
          className="number-of-events"
          onChange={this.onNumberChanged}
          value={this.state.number}
        />
        <span> Events</span>
      </div>
    );
  }
}

export default NumberOfEvents;