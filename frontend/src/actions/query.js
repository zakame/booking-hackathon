import axios from 'axios'
axios.defaults.headers.post = {}


export function searchByCity(city) {
  return dispatch => {
    axios.post('http://localhost/search_by_city', { text: city})
    .then(results => {
      dispatch({type: 'QUERY_SUCCESS', payload: results.data[0]})
    })
    .catch( err => {
      console.log(err.message)
    })
  }
}
