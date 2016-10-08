import {createStore, applyMiddleware} from 'redux'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import Reducers from './reducers'
let middleware = applyMiddleware(thunk, createLogger())


export default createStore(Reducers, middleware)
