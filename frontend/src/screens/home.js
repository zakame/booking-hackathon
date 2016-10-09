import React, { Component } from 'react'
import  {AutoComplete, Toggle} from 'material-ui'
import { connect } from 'react-redux'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import { debounce } from 'lodash'

import {searchByCity} from '../actions'
import { Loader, Flex } from '../components'

class Home extends Component{
  constructor(props) {
    super(props)
    this.style = {
      layout: {
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
      },
      searchBar: {
        fontSize: '24px',
        lineHeight: '36px',
        height: '88px'
      }
    }
  }

  search(data) {
    if(data.length >= 2){this.props.dispatch(searchByCity(data))}
  }

  select(Text) {
    this.props.dispatch(searchByCity(Text))
  }

  render() {
    let {center, zoom} = fitBounds(this.props.bounds, {width: 640, height: 800})
    return  <div style={this.style.layout}>
              <Flex direction='row' align='center'>
                <AutoComplete
                fullWidth
                textFieldStyle={this.style.searchBar}
                hintText="New York, Los Angeles, etc"
                floatingLabelText="Where do you wanna drink?"
                dataSource={this.props.plainCities}
                onUpdateInput={debounce(this.search.bind(this), 500)}
                onNewRequest={this.select.bind(this)}/>
                <Toggle
                  label="Hammer Time"
                  style={{width: 'auto'}}
                />
                {this.props.searching ? <Loader />: null}
              </Flex>

              <Flex style={{height: 'calc(100vh - 250px)'}}>
                {/* results here */}
                <div style={{width: '100%'}}/>
                <GoogleMap
                bootstrapURLKeys={{
                  key: 'AIzaSyCjRJl8UzC5aYZQ4OHkLp1sb74ux1g0HTg'
                }}
                defaultCenter={[37.090240, -95.712891]}
                defaultZoom={1}
                center={center}
                zoom={zoom}/>
                </Flex>

            </div>
  }
}

export default connect((store) => {
  return {
    searching: store.Query.inProgress,
    cityData: store.Query.cityData,
    plainCities: store.Query.cities,
    bounds: store.Query.mapBounds
  }
})(Home)
