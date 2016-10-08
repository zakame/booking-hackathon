import axios from 'axios'
axios.defaults.headers.post = {}


export function searchByCity(city) {
  return dispatch => {
    axios.post('http://localhost/search_by_city', { text: city})
    .then(results => {
      console.log('results!' , results)
    })
    .catch( err => {
      console.log(err.message)
    })
  }
}
