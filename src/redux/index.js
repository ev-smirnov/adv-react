import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import creacteSagaMiddleware from 'redux-saga';
import history from '../history'
import reducer from './reducer'
import { saga } from '../ducks/people';

const sagaMiddleware = creacteSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk, logger)

const store = createStore(reducer, enhancer)
window.store = store

sagaMiddleware.run(saga);

export default store
