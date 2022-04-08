import React from 'react'
import './Info.css'

function Info(props) {
  return (
    <div className="tooltip">
        &#9432;
        {props.text !== '' && <span className="tooltiptext">{props.text}</span>}
    </div>
  )
}

export default Info
