import React from 'react'
import './Info.css'

function Info(props) {
  return (
    <div class="tooltip">
        &#9432;
        {props.text !== '' && <span class="tooltiptext">{props.text}</span>}
    </div>
  )
}

export default Info
