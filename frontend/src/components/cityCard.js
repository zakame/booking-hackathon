import React, {Component} from 'react'


export default class CityCard extends Component {
  constructor(){
    super()
  }

  render() {
    return <div><h3>{this.props.city}</h3><h4>{this.props.country}</h4></div>
  }
}
