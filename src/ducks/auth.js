import firebase from 'firebase';
import { Record } from 'immutable';
import { all, take, cps, put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { appName } from '../config';

/**
 * Constants
 * */

export const moduleName = 'auth';
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;


/**
 * Reducer
 * */

export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
});

export default (state = new ReducerRecord(), action) => {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
      return state.set('loading', true);

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .set('user', payload.user);

    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return state
        .set('loading', false)
        .set('error', error);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();

    default:
      return state
  }
}


/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password },
});

export const signIn = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password },
});

export const signOut = (email, password) => ({
  type: SIGN_OUT_REQUEST,
});


/**
 * Sagas
 * */

export const signUpSaga = function* () {
  const auth = firebase.auth();

  while (true) {
    const action = yield take(SIGN_UP_REQUEST);

    const { payload: { email, password } } = action;
    try {
      const user = yield call([auth, auth.createUserWithEmailAndPassword], email, password);

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user },
      })

    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error,
      })
    }
  }
};

export const signInSaga = function* (action) {
  const auth = firebase.auth();
  const { payload: { email, password } } = action;
  try {
    const user = yield call([auth, auth.signInWithEmailAndPassword], email, password);

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user },
    })

  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error,
    })
  }
};

export const signOutSaga = function* () {
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS
    })
    yield put(push('/auth/signin'))
  } catch (_) {

  }
};

export const watchStatusChange = function* () {
  const auth = firebase.auth();

  try {
    yield cps([auth, auth.onAuthStateChanged])
  } catch (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
};

export function* saga() {
  yield all([
    signUpSaga(),
    watchStatusChange(),
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
  ]);
}
