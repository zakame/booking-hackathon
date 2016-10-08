import { uniq } from 'lodash'

export default function query(state=initialState, action) {
  switch (action.type) {
    case 'QUERY_SUCCESS':
      let cities = action.payload.map( item => {
        return item.name
      })

      cities = uniq([...state.cities, ...cities])
      return {...state, cities}
    default:
      return state
  }
}

const initialState = {
  queryString: '',
  cities: []
}
