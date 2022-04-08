import React from 'react'
import { Link } from 'react-router-dom'
import './LinkButton.css'

function LinkButton(props) {
  const enable = props.enable === undefined ? true : props.enable
  if (!enable) {
    return (
      <div className='linkButton disable'>
        <span>{props.text}</span>
      </div>
    )
  }
  return (
    <Link 
      to={props.to} 
      className='linkButton'
      onClick={props.onClick}
    >
          <span>{props.text}</span>
    </Link>
  )
}

export default LinkButton
