import axios from 'axios'
axios.defaults.headers.post = {}

export function searchByCity(city, getBreweries) {
  return dispatch => {
    dispatch({type: 'SEARCH STARTED', payload: city})
    axios.post('http://localhost/search_by_city', { text: city})
    .then(results => {
      dispatch({type: 'QUERY_SUCCESS', payload: results.data})
    })
    .catch( err => {
      console.log(err.message)
    })
  }
}

export function searchByHotel(lat, lng, hotel) {
  return dispatch => {
    dispatch({type: 'SEARCH STARTED'})
    axios.post('http://localhost/search_by_endpoint',{lat: lat, lng: lng, radius: 5})
    .then(results => {
      dispatch({type: 'HOTEL_QUERY_SUCCESS', payload: {data: results.data, hotel: hotel}})
    })
    .catch( err => {
      console.log(err.message)
    })
  }
}

function getDistance(from, to){
  return Math.sqrt(Math.pow((from.latitude - to.latitude),2) + Math.pow((from.longitude - to.longitude),2))
}

export function getAwesomestHotel(hotels, brews) {
  return dispatch => {
    let cost = 100000
    let awesome = hotels.filter( hotel => {
      let distance = brews.reduce( (iterable, brew) =>{
          return (iterable + getDistance(hotel, brew))

      }, 0)
      cost = distance <= cost ? distance : cost
      return(distance == cost)
    })
    dispatch({type: 'AWESOMEST_HOTEL', payload: awesome[awesome.length-1]})
    dispatch(searchByHotel(awesome[awesome.length-1].latitude, awesome[awesome.length-1].longitude, awesome[awesome.length-1]))
  }
}

export function hammerDown(nodes, startNodes, terminalNodes, currentNode) {
}
