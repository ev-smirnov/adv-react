import React from 'react';
import PersonTable from './PersonTable';
import renderer from 'react-test-renderer';
import { testPeople } from '../../mocks/people';

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

it('should renders correctly', () => {
  const tree = renderer.create(<PersonTable people={testPeople} />);
  expect(tree).toMatchSnapshot();
});
