import { uniqBy, max, min } from 'lodash'

const initialState = {
  inProgress: false,
  queryString: '',
  cities: [],
  cityData: [],
  breweries: [],
  mapBounds: {
    nw: {
      lat: 37.741461,
      lng:  -122.48861
    },
    se: {
      lat: 37.5799472,
      lng: -122.3462964
    }
  }
}


export default function query(state=initialState, action) {
  switch (action.type) {
    case 'SEARCH STARTED':
      return {...state, inProgress: true}
    case 'QUERY_SUCCESS':
      let cityData = uniqBy([...state.cityData, ...action.payload[0]], 'name')
      let cities = cityData.map( item => {
        return item.name
      })

      let hotels = action.payload[2].length ? action.payload[2].map( item => {
        return {...item, latitude: item.location.latitude, longitude: item.location.longitude}
      }) : undefined


      return {...state, cities, cityData, inProgress: false, breweries: action.payload[1], hotels: hotels, mapBounds: findMapBounds([...hotels, ...action.payload[1]])}
    case 'SELECTED_CITY':
    default:
      return state
  }
}


function findMapBounds(arrayOfBrewsandHotels) {
  console.log(arrayOfBrewsandHotels)
  let [lats, longs] = arrayOfBrewsandHotels.reduce((result, item) => {
    return [[...result[0], parseFloat(item.latitude)], [...result[1], parseFloat(item.longitude)]]
  }, [lats=[], longs=[]])
  return {
    nw: {
      lat: max(lats, -10),
      lng: min(longs, -10)
    },
    se: {
      lat: min(lats, -10),
      lng: max(longs, -10)
    }
  }
}

function findMinAndMax(locationData) {

}
