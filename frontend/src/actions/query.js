import axios from 'axios'
axios.defaults.headers.post = {}

import { memoize } from 'lodash'

export function searchByCity(city) {
  return dispatch => {
    dispatch({type: 'SEARCH STARTED'})
    return cache(city) ? dispatch({type: 'CACHED_RESULT', payload: cache(city)}) : (axios.post('http://localhost/search_by_city', { text: city})
    .then(results => {
      dispatch({type: 'QUERY_SUCCESS', payload: results.data[0]})
      cache.cache.set(city, results.data[0])
    })
    .catch( err => {
      console.log(err.message)
    }))
  }
}

const cache = memoize((city) => false)
