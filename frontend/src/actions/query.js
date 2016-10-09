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


export function hammerDown(nodes, startNodes, terminalNodes, currentNode) {

}

function getAllAdjacent(node, nodes) {
  return nodes.map((item) => {
    return getDistance(node, item)
  })
}


function getDistance(from, to){
  return Math.sqrt((from.lat - to.lat)^2 + (from.long - to.long)^2)
}

const cache = memoize((city) => false)
