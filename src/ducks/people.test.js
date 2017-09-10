import { addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON_SUCCESS } from './people';
import { call, put } from 'redux-saga/effects';
import firebase from 'firebase';
import fixtureFactory from 'fixture-factory';
import { personDataModel, personUidDataModel } from '../mocks/people';


it('should dispatch person with id', () => {
  const person = fixtureFactory.generateOne(personDataModel);

  const saga = addPersonSaga({
    type: ADD_PERSON_REQUEST,
    payload: person,
  });

  const ref = firebase.database().ref('people');

  expect(saga.next().value).toEqual(call([ref, ref.push], person));

  const data = { key: fixtureFactory.generateOne(personUidDataModel) };

  expect(saga.next(data).value).toEqual(put({
    type: ADD_PERSON_SUCCESS,
    payload: { [data.key]: person },
  }));
});
