import React, { Component } from 'react'
import  {AutoComplete, Toggle} from 'material-ui'
import { connect } from 'react-redux'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import { debounce } from 'lodash'

import {searchByCity, searchByCoords} from '../actions'
import { Loader, Flex , BrewPin, HotelPin, HotelCard, BrewCard} from '../components'

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

  componentWillMount(){
    this.props.dispatch(searchByCity('san fran'))
  }
  search(data) {
    if(data.length >= 2){this.props.dispatch(searchByCity(data))}
  }

  select(Text) {
    this.props.dispatch(searchByCity(Text))
  }

  clickHotel(hotel){
    this.props.dispatch(searchByCoords(hotel.latitude, hotel.longitude))
  }

  render() {
    let {center, zoom} = fitBounds(this.props.bounds, {width: 640, height: 640})
    let [brews, brewCards] = this.props.breweries ? this.props.breweries.reduce( (iterable, item, index) => {
      return [[...iterable[0], <BrewPin key={item.id} lat={item.latitude} lng={item.longitude} text={index+1}/>] ,[...iterable[1],
      <BrewCard key={item.id} data={item}/>]]
    }, [[], []] ) : []

    let [hotels, hotelCards] = this.props.hotels ? this.props.hotels.reduce( (iterable,item, index) => {
      return [[...iterable[0], <HotelPin key={item.hotel_id} lat={item.latitude} lng={item.longitude} text={index+1}/>] , [...iterable[1],
          <HotelCard clickHandler={this.clickHotel.bind(this, item)} data={item} key={item.hotel_id}/>]]
    }, [[], []] ) : []

    console.log(hotels, hotelCards)
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

              <Flex style={{height: 'calc(100vh - 190px)'}}>
                {/* results here */}
                <div style={{width: '150%', marginRight: '20px'}}  className='grid'>
                  <div>
                    <h3>Drink at:</h3>
                    <div className='container' style={{ height: 'calc(100vh - 190px)', overflow: 'scroll' ,overflowX:'hidden'}}>{brewCards}</div>
                  </div>
                  <div>
                    <h3>Crash at:</h3>
                    <div className='container' style={{ height: 'calc(100vh - 190px)', overflow: 'scroll' ,overflowX:'hidden'}}>{hotelCards}</div>
                  </div>
                </div>
                <GoogleMap
                bootstrapURLKeys={{
                  key: 'AIzaSyCjRJl8UzC5aYZQ4OHkLp1sb74ux1g0HTg'
                }}
                defaultCenter={[37.090240, -95.712891]}
                defaultZoom={1}
                center={center}
                zoom={zoom}>
                {brews}
                {hotels}
                </GoogleMap>
                </Flex>

            </div>
  }
}

export default connect((store) => {
  return {
    searching: store.Query.inProgress,
    cityData: store.Query.cityData,
    plainCities: store.Query.cities,
    bounds: store.Query.mapBounds,
    breweries: store.Query.breweries,
    hotels: store.Query.hotels
  }
})(Home)
