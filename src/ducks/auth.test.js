import firebase from 'firebase';
import reducer, {
  signUpSaga,
  signOutSaga,
  signInSaga,
  watchStatusChange,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  ReducerRecord,
} from './auth';
import { take, call, put, cps } from 'redux-saga/effects';
import { push } from 'react-router-redux';

/**
 * Saga tests
 * */

describe('testing sagas', () => {
  const auth = firebase.auth();
  const authData = {
    email: 'user@for.test',
    password: 'testPassword',
  };
  const user = {
    email: authData.email,
    uid: Math.random().toString(),
  };
  const error = new Error();

  it('should sign up', () => {
    const saga = signUpSaga();
    const requestAction = {
      type: SIGN_UP_REQUEST,
      payload: authData,
    };

    expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST));

    expect(saga.next(requestAction).value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        authData.email,
        authData.password,
      ),
    );

    expect(saga.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user },
      }),
    );

    expect(saga.throw(error).value).toEqual(
      put({
        type: SIGN_UP_ERROR,
        error,
      }),
    );
  });

  it('should sign in', () => {
    const requestAction = {
      type: SIGN_IN_REQUEST,
      payload: authData,
    };

    const saga = signInSaga(requestAction);

    expect(saga.next().value).toEqual(
      call(
        [auth, auth.signInWithEmailAndPassword],
        authData.email,
        authData.password,
      ),
    );

    expect(saga.next(user).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user },
      }),
    );

    expect(saga.throw(error).value).toEqual(
      put({
        type: SIGN_IN_ERROR,
        error,
      }),
    );
  });

  it('should sign out', () => {
    const action = {
      type: SIGN_OUT_REQUEST,
    };

    const saga = signOutSaga(action);

    expect(saga.next().value).toEqual(
      call([auth, auth.signOut])
    );

    expect(saga.next().value).toEqual(put({
      type: SIGN_OUT_SUCCESS
    }));

    expect(saga.next().value).toEqual(put(push('/auth/signin')))
  });

  it('should watch auth status', () => {
    const auth = firebase.auth();
    const saga = watchStatusChange();

    expect(saga.next().value).toEqual(
      cps([auth, auth.onAuthStateChanged])
    );

    expect(saga.throw(user).value).toEqual(put({
      type: SIGN_IN_SUCCESS,
      payload: { user },
    }))
  });
});


/**
 * Reducer tests
 * */

describe('testing reducer', () => {
  const user = {
    email: 'user@for.test',
    uid: Math.random().toString(),
  };

  it('should sign out', () => {
    const state = new ReducerRecord({
      user,
    });

    const newState = reducer(state, { type: SIGN_OUT_SUCCESS });

    expect(newState).toEqual(new ReducerRecord());
  });

  it('should sign in', () => {
    const state = new ReducerRecord();

    const newState = reducer(state, {
      type: SIGN_IN_SUCCESS,
      payload: { user },
    });

    expect(newState).toEqual(new ReducerRecord({ user }));
  });
});
