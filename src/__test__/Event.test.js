import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<Event /> render', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(
      <Event event={
        {
          local_date: '2019-05-06',
          local_time: '18:45',
          name: 'Kotlin Users Group Meetup May',
          yes_rsvp_count: 90,
          link: 'https://www.meetup.com/Kotlin-User-Group-Munich/events/260445923/',
          description: '<p>Hello Kotliners. Join us in our May gathering at Google office.</p> <p>Agenda:</p> <p>19:00 - Opening doors</p> <p>19:15 - Michal Harakal - Kotlin multiplatform roller-coaster ride or how I\'ve rewritten a conference app over the weekend.</p> <p>19.55 - Shagen Ogandzhanian (JetBrains) - Kotlin and JS interop, what\'s next. How to use javascript libraries in Kotlin world</p> <p>20.30 - Leonid Popescu (Payworks) - Hybrid SDKs or how we started with Kotlin/Multiplatform without trashing the existing code base</p> <p>Have you been working on a project with Kotlin? Is there a library you would like to discuss? Do you want to try public speaking?<br/>Message us, come and have fun sharing your Kotlin story!</p>',
          visibility: 'public',
          venue: {
            name: 'Google',
            address_1: 'Erika-Mann-Straße 33',
            city: 'München',
            localized_country_name: 'Germany'
          },
          group: {
            name: 'Kotlin User Group Munich - KUG Munich',
          },
        }
      }/>
    );
  });

  beforeEach(() => {
    EventWrapper.setState({ expanded: false });
  });

  test('render enough information', () => {
    expect(EventWrapper.find('.Event')).toHaveLength(1);
    expect(EventWrapper.find('.time')).toHaveLength(1);
    expect(EventWrapper.find('.name')).toHaveLength(1);
    expect(EventWrapper.find('.group-name')).toHaveLength(1);
    expect(EventWrapper.find('.going')).toHaveLength(1);
  });

  test('render correct information', () => {
    expect(EventWrapper.find('.time').text()).toEqual('18:45 - 2019-05-06');
    expect(EventWrapper.find('.name').text()).toEqual('Kotlin Users Group Meetup May');
    expect(EventWrapper.find('.group-name').text()).toEqual('Group: Kotlin User Group Munich - KUG Munich');
    expect(EventWrapper.find('.going').text()).toEqual('90 people are going');
  });

  test('show extra info when user clicks on "Details" button', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.extra')).toHaveLength(1);
  });

  test('hide extra info when user clicks on "Details" button', () => {
    EventWrapper.setState({ expanded: true });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.extra')).toHaveLength(0);
  });

  test('Display extra info', () => {
    EventWrapper.setState({ expanded: true });
    expect(EventWrapper.find('.extra .address')).toHaveLength(1);
    expect(EventWrapper.find('.extra .visibility')).toHaveLength(1);
    expect(EventWrapper.find('.extra .link')).toHaveLength(1);
    expect(EventWrapper.find('.extra .description')).toHaveLength(1);
  });

  test('Display correct extra info', () => {
    EventWrapper.setState({ expanded: true });
    expect(EventWrapper.find('.extra .address').text()).toEqual('Google, Erika-Mann-Straße 33, München, Germany');
    expect(EventWrapper.find('.extra .visibility').text()).toEqual('public');
    expect(EventWrapper.find('.extra .link').prop('href')).toEqual('https://www.meetup.com/Kotlin-User-Group-Munich/events/260445923/');
    expect(EventWrapper.find('.extra .description').html()).toEqual('<div class=\"description\"><p>Hello Kotliners. Join us in our May gathering at Google office.</p> <p>Agenda:</p> <p>19:00 - Opening doors</p> <p>19:15 - Michal Harakal - Kotlin multiplatform roller-coaster ride or how I\'ve rewritten a conference app over the weekend.</p> <p>19.55 - Shagen Ogandzhanian (JetBrains) - Kotlin and JS interop, what\'s next. How to use javascript libraries in Kotlin world</p> <p>20.30 - Leonid Popescu (Payworks) - Hybrid SDKs or how we started with Kotlin/Multiplatform without trashing the existing code base</p> <p>Have you been working on a project with Kotlin? Is there a library you would like to discuss? Do you want to try public speaking?<br/>Message us, come and have fun sharing your Kotlin story!</p></div>');
  });
});