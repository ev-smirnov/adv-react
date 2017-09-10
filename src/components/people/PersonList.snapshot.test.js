import React from 'react';
import PersonList from './PersonList';
import renderer from 'react-test-renderer';
import { testPeople } from '../../mocks/people';

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

it('should renders correctly', () => {
  const tree = renderer.create(<PersonList people={testPeople} />);
  expect(tree).toMatchSnapshot();
});
