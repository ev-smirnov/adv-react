import React from 'react';
import fixtureFactory from 'fixture-factory';
import { shallow, mount } from 'enzyme';
import PersonTable from './PersonTable';
import Loader from '../common/Loader';
import { savedPersonDataModel } from '../../mocks/people';

it('should render loader', () => {
  const container = shallow(<PersonTable loading />);

  expect(container.contains(<Loader/>));
});

it('should request fetch data', (done) => {
  mount(<PersonTable people = {[]} fetchAll={done}/>);
});

it('should render all items from short list', () => {
  const shortList = fixtureFactory.generate(savedPersonDataModel, 5);

  const container = mount(<PersonTable people = {shortList} />);
  const rows = container.find('.test--people-list__row');

  expect(rows.length).toEqual(6)
});

it('should render a part of long list', () => {
  const longList = fixtureFactory.generate(savedPersonDataModel, 200);

  const container = mount(<PersonTable people = {longList}/>);
  const rows = container.find('.test--people-list__row');

  expect(rows.length).toEqual(18);
});
