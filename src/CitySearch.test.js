import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from './CitySearch';

describe('<CitySearch /> render', () => {
  const CitySearchWrapper = shallow(<CitySearch />);

  it('render text input', () => {
    expect(CitySearchWrapper.find('input[type="text"]')).toHaveLength(1);
  });

  it('render list of suggestions', () => {
    expect(CitySearchWrapper.find('ul.suggestions')).toHaveLength(1);
  });
});

describe('<CitySearch /> interactions', () => {
  // const CitySearchWrapper = shallow(<CitySearch />);
  const updateCity = jest.fn();
  const CitySearchWrapper = shallow(<CitySearch updateCity={updateCity} />);
  CitySearchWrapper.setState({
    suggestions: [
      {
        name_string: 'Munich, Germany',
        lat: 48.14,
        lon: 11.58
      },
      {
        name_string: 'Munich, North Dakota, USA',
        lat: 48.66,
        lon: -98.85
      }
    ] 
  });

  it('render suggested items correctly', () => {
    expect(CitySearchWrapper.find('ul.suggestions li')).toHaveLength(2);
    expect(CitySearchWrapper.find('ul.suggestions li').at(0).text()).toEqual('Munich, Germany');
    expect(CitySearchWrapper.find('ul.suggestions li').at(1).text()).toEqual('Munich, North Dakota, USA');
  });

  it('change city when user clicks on a suggestion', () => {
    CitySearchWrapper.find('ul.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.find('input[type="text"]').props().value).toEqual('Munich, Germany');
    expect(updateCity).toBeCalled();
    expect(updateCity.mock.calls.length).toBe(1);
    expect(updateCity).toBeCalledWith(48.14, 11.58);
  });
});

describe('<CitySearch /> integration', () => {
  const CitySearchWrapper = shallow(<CitySearch />);

  it('render suggested items correctly', async () => {
    CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Munich' } });
    await CitySearchWrapper.update();
    expect(CitySearchWrapper.find('ul.suggestions li')).toHaveLength(2);
    expect(CitySearchWrapper.find('ul.suggestions li').at(0).text()).toEqual('Munich, Germany');
    expect(CitySearchWrapper.find('ul.suggestions li').at(1).text()).toEqual('Munich, North Dakota, USA');
  });
});
