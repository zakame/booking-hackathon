import React, { Component } from 'react';
import {Router, hashHistory} from 'react-router'
import {Provider} from 'react-redux'

// Routes
import Routes from './routes'

// store
import Store from './store'

export default class App extends Component {
  render() {
    return  <Provider store={Store}>
              <Router history={hashHistory} routes={Routes} />
            </Provider>

  }
}
