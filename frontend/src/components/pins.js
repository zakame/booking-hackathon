import React from 'react'

export function BrewPin(props, state) {
  let style = {
    height: '18px',
    width: '18px',
    borderRadius: '30px',
    backgroundColor: '#EC824C',
    fontSize: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return <div style={style}> <span>{`#${props.text}`}</span></div>
}



export function HotelPin(props, state) {
  let style = {
    height: '18px',
    width: '18px',
    borderRadius: '30px',
    backgroundColor: '#06B2AD',
    fontSize: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return <div style={style}> <span>{`#${props.text}`}</span></div>
}
