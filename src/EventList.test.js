import React from 'react';
import { shallow } from 'enzyme';
import EventList from './EventList';
import Event from './Event';

describe('<EventList /> render', () => {
  it('render list of events', () => {
    const EventListWrapper = shallow(<EventList events={[]} />);
    expect(EventListWrapper.find('ul.EventList')).toHaveLength(1);
  });

  it('render empty list of events', () => {
    const EventListWrapper = shallow(<EventList events={[]} />);
    expect(EventListWrapper.find(Event)).toHaveLength(0);
  });

  it('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}/>);
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});
