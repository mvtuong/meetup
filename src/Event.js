import React, { Component } from 'react';

class Event extends Component {
  state = {
    expanded: false,
  }

  onDetailsButtonClicked = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const event = this.props.event || {};
    const venue = event.venue || {};
    const group = event.group || {};
    return (
      <li className="Event">
        <p className="time">{event.local_time} - {event.local_date}</p>
        <p className="name">{event.name}</p>
        {group.name && <p className="group-name">Group: {group.name}</p>}
        <p className="going">{event.yes_rsvp_count} people are going</p>
        {this.state.expanded &&
          <div className="extra">
            {venue.name && 
              <p className="address">
                {venue.name
                  + ', ' + venue.address_1
                  + ', ' + venue.city
                  + ', ' + venue.localized_country_name
                }
              </p>
            }
            <div className="description" dangerouslySetInnerHTML={{__html: event.description}} />
            <p className="visibility">{event.visibility}</p>
            <a className="link" href={event.link}>Event Link</a>
          </div>
        }
        <button className="details-btn" onClick={this.onDetailsButtonClicked}>Details</button>
      </li>
    );
  }
}

export default Event;