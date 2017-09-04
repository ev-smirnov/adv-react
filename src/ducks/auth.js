import firebase from 'firebase';
import { Record } from 'immutable';
import { all, take, cps, put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { appName } from '../config';

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_APP_REQUEST`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`

export default (state = new ReducerRecord(), action) => {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set('loading', true)

    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .set('user', payload.user)

    case SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('error', error)

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord()

    default:
      return state
  }
};

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password },
});

export const signOut = (email, password) => ({
  type: SIGN_OUT_REQUEST,
});

export const signUpSaga = function* () {
  const auth = firebase.auth();

  while (true) {
    const action = yield take(SIGN_UP_REQUEST);

    const { payload: { email, password } } = action;
    try {
      const user = yield call([auth, auth.createUserWithEmailAndPassword], email, password);

      yield put({
        type: SIGN_IN_SUCCESS,
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

export const saga = function* () {
  yield all([
    signUpSaga(),
    watchStatusChange(),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga),
  ])
};
