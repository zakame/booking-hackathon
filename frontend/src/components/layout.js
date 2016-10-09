import React from 'react'

export const Flex = (props, state) => {
  const style = {
    display: 'flex',
    flex: props.flex || '',
    flexDirection: props.direction || 'row',
    justifyContent: props.justify || 'flex-start',
    alignItems: props.align || 'flex-start',
    flexWrap: props.wrap ? 'wrap' : '',
    transition: 'all 0.3s linear',
    position: 'relative',
    ...props.style
  }

  return <div style={style}>{props.children}</div>
}
