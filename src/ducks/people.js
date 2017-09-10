import { Record, OrderedMap } from 'immutable';
import { reset } from 'redux-form';
import firebase from 'firebase';
import { createSelector } from 'reselect';
import { put, call, takeEvery, all, select } from 'redux-saga/effects';
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
export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`;
export const ADD_EVENT_ERROR = `${prefix}/ADD_EVENT_ERROR`;

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
  events: [],
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

    case ADD_EVENT_SUCCESS:
      return state
        .setIn(['entities', payload.personUid, 'events'], payload.events);

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

export const addEventToPerson = (eventUid, personUid) => ({
  type: ADD_EVENT_REQUEST,
  payload: { eventUid, personUid }
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

export const addEventToPersonSaga = function* (action) {
  const { eventUid, personUid } = action.payload;

  const state = yield select(stateSelector);
  const events = state.getIn(['entities', personUid, 'events']).concat(eventUid);

  const eventsRef = firebase.database().ref(`people/${personUid}/events`);

  try {
    yield call([eventsRef, eventsRef.set], events);

    yield put({
      type: ADD_EVENT_SUCCESS,
      payload: {
        personUid,
        events
      },
    });
  } catch (error) {
    yield put({
      type: ADD_EVENT_ERROR,
      error,
    });
  }

};

export const saga = function* () {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(ADD_EVENT_REQUEST, addEventToPersonSaga),
  ])
};
