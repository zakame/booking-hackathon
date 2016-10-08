import React from 'react'

export default function Image(props, state) {
  const style = {
      height: props.height ||'60px',
      width: props.width ||'250px',
      backgroundPosition: 'center center',
      backgroundImage: `url(${props.source})`,
      backgroundSize: props.cover ? 'cover': 'contain',
      backgroundRepeat: 'no-repeat'
    }
  return  <div style={style} className={props.className}/>
}
