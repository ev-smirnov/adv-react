import firebase from 'firebase';
import { Record } from 'immutable';
import { appName } from '../config';

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_APP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`

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

    default:
      return state
  }
};

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP_REQUEST
    })

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => dispatch({
        type: SIGN_UP_SUCCESS,
        payload: {user}
      }))
      .catch((error) => dispatch({
        type: SIGN_UP_ERROR,
        error
      }))

  };
};

firebase.auth().onAuthStateChanged((user) => {
  const store = require('../redux').default
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
})
