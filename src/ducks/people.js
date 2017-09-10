import { Record, OrderedMap } from 'immutable';
import { reset } from 'redux-form';
import firebase from 'firebase';
import { createSelector } from 'reselect';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { appName } from '../config';
import { fbDataToEntities } from './utils';

/**
 * Constants
 * */
export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_ERROR = `${prefix}/FETCH_ALL_ERROR`;

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap([]),
  loading: false,
  loaded: false,
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
        .mergeIn(['entities'], fbDataToEntities(payload, PersonRecord));

    case FETCH_ALL_REQUEST:
      return state
        .set('loading', true);

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbDataToEntities(payload, PersonRecord));

    default:
      return state
  }
};

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const loadingSelector = createSelector(stateSelector, state => state.loading);
export const personListSelector = createSelector(entitiesSelector, entities => (
  entities.valueSeq().toArray()
));

/**
 * Action Creators
 * */
export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: person
});

export const fetchAll = () => ({
  type: FETCH_ALL_REQUEST,
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

export const fetchAllSaga = function* () {
  const ref = firebase.database().ref('people');

  try {
    const data = yield call([ref, ref.once], 'value');

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val(),
    });
  } catch (error) {
    yield put({
      type: FETCH_ALL_ERROR,
      error,
    });
  }
};

export const saga = function* () {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
  ])
};
