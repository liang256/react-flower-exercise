import React from 'react'
import { Link } from 'react-router-dom'
import './LinkButton.css'

function LinkButton(props) {
  return (
    // <button className='linkButton'>
      <Link to={props.to} className='linkButton'>
          <span>{props.text}</span>
      </Link>
    // </button>
  )
}

export default LinkButton
