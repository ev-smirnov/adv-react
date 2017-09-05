import React from 'react';
import { shallow, mount } from 'enzyme';
import events from '../../mocks/conferences';
import { EventListTable } from './EventListTable';
import Loader from '../common/Loader';

const testEvents = events.map(event => ({...event, uid: Math.random().toString()}));

it('should render loader', () => {
  const container = shallow(<EventListTable loading />);

  expect(container.contains(<Loader />))
});

it('should render event list', () => {
  const container = shallow(<EventListTable events={testEvents} />);

  const rows = container.find('tr');

  expect(rows.length).toBe(testEvents.length);
});

it('should request fetch data', (done) => {
  mount(<EventListTable events={[]} fetchAll={done} />);
});
