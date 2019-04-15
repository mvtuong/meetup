import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';

describe('<App /> render correct components', () => {
  const AppWrapper = shallow(<App />);
  it('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  it('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

  it('render EventList', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
});

describe('<App /> integration', async () => {
  const AppWrapper = shallow(<App />);
  it('render correct number of events', () => {
    expect(AppWrapper.find(EventList).props().events.length).toEqual(4);
  });

  it('update state when user change the city', () => {
    AppWrapper.instance().updateCity(1.4, 1.5);
    expect(AppWrapper.state('lat')).toBeCloseTo(1.4);
    expect(AppWrapper.state('lon')).toBeCloseTo(1.5);
  });
});
