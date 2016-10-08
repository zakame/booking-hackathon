import React, { Component } from 'react'
import  {AutoComplete} from 'material-ui'

export default class Home extends Component{
  constructor(props) {
    super(props)
    this.style = {
      layout: {
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
  search(searchText, dataSource) {
    console.log(searchText)
  }
  render() {
    return  <div style={this.style.layout}>
              <AutoComplete
                hintText="Where do you wanna drink?"
                floatingLabelText="Where do you wanna drink?"
                dataSource={data}
                onUpdateInput={this.search.bind(this)}/>
            </div>
  }
}


const data = [
    'potato',
    'pattas'
]
