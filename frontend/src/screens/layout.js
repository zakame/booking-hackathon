import React, {Component} from 'react'
import { Navbar } from '../components'
export default class Layout extends Component{
  constructor(props) {
    super(props)
    this.style = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'stretch'
    }
  }
  render() {
    return <div style={this.style}>
              <Navbar />
              {this.props.children}
            </div>
  }
}
