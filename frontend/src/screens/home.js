import React, { Component } from 'react'
import  {TextField} from 'material-ui'
import { connect } from 'react-redux'

import { debounce } from 'lodash'

import {searchByCity} from '../actions'
import { Loader } from '../components'

class Home extends Component{
  constructor(props) {
    super(props)
    this.style = {
      layout: {
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      searchBar: {
        fontSize: '24px',
        lineHeight: '36px',
        height: '88px'
      }
    }
  }

  search(ev, data) {
    this.props.dispatch(searchByCity(data))
  }

  select(Text) {
    this.props.dispatch(searchByCity(Text))
  }

  render() {
    return  <div style={this.style.layout}>
              <TextField
                fullWidth
                style={this.style.searchBar}
                hintText="New York, Los Angeles, etc"
                floatingLabelText="Where do you wanna drink?"
                onChange={debounce(this.search.bind(this), 500)}/>
              {this.props.searching ? <Loader />: null}
            </div>
  }
}

export default connect((store) => {
  return {
    searching: store.Query.inProgress,
    cities: store.Query.cityData
  }
})(Home)
