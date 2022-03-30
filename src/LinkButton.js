import React from 'react'
import { Link } from 'react-router-dom'
import './LinkButton.css'

function LinkButton(props) {

  if (!props.enable) {
    return (
      <div className='linkButton disable'>
        <span>{props.text}</span>
      </div>
    )
  }
  return (
    <Link to={props.to} className='linkButton'>
          <span>{props.text}</span>
    </Link>
  )
}

export default LinkButton
