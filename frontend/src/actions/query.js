import axios from 'axios'

export function searchByCity(city) {
  return dispatch => {
    axios.post('http://localhost:3000/search_by_city', { text: city})
    .catch( err => {
      console.log(err.message)
    })
  }
}
