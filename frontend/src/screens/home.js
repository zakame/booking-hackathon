import React, { Component } from 'react'
import  {AutoComplete, RaisedButton} from 'material-ui'
import { connect } from 'react-redux'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import { debounce } from 'lodash'

import {searchByCity, searchByHotel , getAwesomestHotel} from '../actions'
import { Loader, Flex , BrewPin, HotelPin, HotelCard, BrewCard, DrawLine} from '../components'

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

  componentDidMount(){
    this.props.dispatch(searchByCity('Amsterdam'))
  }
  search(data) {
    if(data.length >= 2){this.props.dispatch(searchByCity(data))}
  }

  select(Text) {
    this.props.dispatch(searchByCity(Text))
  }

  clickHotel(hotel){
    this.props.dispatch(searchByHotel(hotel.latitude, hotel.longitude, hotel))
  }

  hammerTime(ev, data, brews, hotels){
    console.log(brews, hotels)
    if (data) {

      this.props.dispatch(getAwesomestHotel(hotels, brews))
    }
  }

  render() {
    let {center, zoom} = fitBounds(this.props.bounds, {width: 500, height: 500})
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
                <RaisedButton
                  label="FIND BEST"
                  style={{width: '200px'}}
                  primary
                  onClick={this.hammerTime.bind(this, event, this, this.props.breweries, this.props.hotels)}
                />
                {this.props.searching ? <Loader />: null}
              </Flex>

              <Flex style={{height: 'calc(100vh - 190px)'}}>
                {/* results here */}
                <div style={{width: '150%', marginRight: '20px'}}  className='grid'>
                  <div>
                    <h3>Crash at:</h3>
                    <div className='container' style={{ height: 'calc(100vh - 190px)', overflow: 'scroll' ,overflowX:'hidden'}}>{hotelCards}</div>
                  </div>
                  <div>
                    <h3>Drink at:</h3>
                    <div className='container' style={{ height: 'calc(100vh - 190px)', overflow: 'scroll' ,overflowX:'hidden'}}>{brewCards}</div>
                  </div>

                </div>
                <GoogleMap
                bootstrapURLKeys={{
                  key: 'AIzaSyCjRJl8UzC5aYZQ4OHkLp1sb74ux1g0HTg'
                }}
                defaultCenter={[52.373095, 4.893305]}
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
