import React from 'react'

import loaderImage from '../static/loading.png'
import Image from './media'

export default function Loader(props, state) {
  return <Image source={loaderImage} className='loader'/>
}
