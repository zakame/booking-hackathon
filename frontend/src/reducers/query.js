import { uniqBy } from 'lodash'

const initialState = {
  inProgress: false,
  queryString: '',
  cities: [],
  cityData: [],
  breweries: []
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
      return {...state, cities, cityData, inProgress: false, breweries: action.payload[1]}
    case 'SELECTED_CITY':
    default:
      return state
  }
}
