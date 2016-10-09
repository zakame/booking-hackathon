import React, {Component} from 'react'
import {Paper} from 'material-ui'
import {Flex, Image} from '../components'

import Beer from '../static/beer.png'
import Hotel from '../static/hotel.png'
const style ={
    container: {
      padding: '10px',
      marginBottom: '10px',
      fontSize: '12px',
      cursor: 'pointer'
    },
    type: {
      fontSize: '14px',
      lineHeight: '15px',
      margin: '6px',
      opacity: 0.6
    },
    name: {
      fontSize: '20px',
      lineHeight: '21px',
      margin: '6px',
      fontWeight: 'lighter',
    },
    link: {
      color: '#999',
      fontSize: '11px'
    }
}



export class BrewCard extends Component {
  render() {
    return <Paper style={style.container} onClick={this.props.clickHandler}>
            <Flex align='center'>
              <Image source={Beer} width='20px' height='20px' style={{marginRight: '20px', flexShrink: 0}}/>
              <div><p style={style.type}>{this.props.data.locationTypeDisplay}</p>
              <p style={style.name}>{this.props.data.brewery.name}</p>
              <p style={style.type}>{this.props.data.streetAddress}</p>
              <a style={style.link} target='_BLANK_' href={this.props.data.brewery.website}>Website</a></div>
            </Flex>
            </Paper>
  }
}

export class HotelCard extends Component {
  render() {
    return <Paper style={style.container} onClick={this.props.clickHandler}>
            <Flex align='center'>
              <Image source={Hotel} width='20px' height='20px' style={{marginRight: '20px', flexShrink: 0}}/>
              <div><p style={style.type}>{` ${"★".repeat(this.props.data.class)} Hotel`}</p>
              <p style={style.name}>{this.props.data.name}</p>
              <p style={style.type}>{this.props.data.address}</p>
              <p style={style.type}>{`From ${this.props.data.currencycode}${this.props.data.minrate} to ${this.props.data.currencycode}${this.props.data.maxrate}`}</p>
              <a style={style.link} target='_BLANK_' href={this.props.data.url}>Website</a></div>
            </Flex>
            </Paper>
  }
}
