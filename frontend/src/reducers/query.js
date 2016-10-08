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

      let cities = action.payload.map( item => {
        return item.name
      })
      return {...state, cities, cityData: action.payload, inProgress: false}
    case 'SELECTED_CITY':
    default:
      return state
  }
}
