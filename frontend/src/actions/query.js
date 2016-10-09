import axios from 'axios'
axios.defaults.headers.post = {}

import { memoize } from 'lodash'

export function searchByCity(city, getBreweries) {
  return dispatch => {
    dispatch({type: 'SEARCH STARTED', payload: city})
    return cache(city) ? dispatch({type: 'CACHED_RESULT', payload: cache(city)}) : (axios.post('http://localhost/search_by_city', { text: city})
    .then(results => {
      dispatch({type: 'QUERY_SUCCESS', payload: results.data})
      cache.cache.set(city, results.data)
    })
    .catch( err => {
      console.log(err.message)
    }))
  }
}


const cache = memoize((city) => false)
