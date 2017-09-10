import { Record, OrderedMap } from 'immutable';
import { reset } from 'redux-form';
import firebase from 'firebase';
import { appName } from '../config';
import { put, call, takeEvery } from 'redux-saga/effects';
import { fbDataToEntities } from './utils';

/**
 * Constants
 * */
export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap([]),
});

const PersonRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null,
});

export default (state = new ReducerState(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state
        .mergeIn(['entities'], fbDataToEntities(payload, PersonRecord))

    default:
      return state
  }
};

/**
 * Selectors
 * */

/**
 * Action Creators
 * */
export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: person
});

/**
 * Sagas
 * */
export const addPersonSaga = function* ({ payload }) {
  const ref = firebase.database().ref('people');

  try {
    const data = yield call([ref, ref.push], payload);

    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: {[data.key]: payload}
    });

    yield put(reset('person'));
  } catch (error) {
    yield put({
      type: ADD_PERSON_ERROR,
      error,
    });
  }
};

export const saga = function* () {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
};
