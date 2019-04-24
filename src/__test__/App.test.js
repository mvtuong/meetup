import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockEvents } from '../mock-events';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('get list of events after user selects a city', async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.find('.city').simulate('change', { target: { value: 'Munich' } });
    // AppWrapper.find('.city').props().onChange({ target: { value: 'Munich' } });
    // await AppWrapper.update();
    // AppWrapper.instance().forceUpdate();
    // expect(AppWrapper.find('.suggestions li')).toHaveLength(1);
    AppWrapper.find('.suggestions li').at(0).simulate('click');
    // AppWrapper.find('.suggestions li').at(0).simulate('click');
    // expect(AppWrapper.state('events')).toEqual();
  });
});
