import React, {Component} from 'react'
import { Navbar } from '../components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'



export default class Layout extends Component{
  constructor(props) {
    super(props)
    this.style = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'stretch',
      minHeight: '100vh'
    }
    // Material UI click event handler (dependency is magic)
    injectTapEventPlugin()
  }
  render() {
    return <div style={this.style}>
              <Navbar />
              <MuiThemeProvider>
                {this.props.children}
              </MuiThemeProvider>
            </div>
  }
}
