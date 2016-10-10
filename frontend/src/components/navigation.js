import React from 'react'
import Image from './media'

import logo from '../static/logo_white.png'

export default function Navbar(props, state) {
  const style = {
    container: {
      height: '60px',
      backgroundColor: '#EC824C',
      display: 'flex',
      flexDirection: 'row',
      padding: '5px 100px'
    }
  }
  return  <div style={style.container}>
            <Image source={logo} />
          </div>
}
