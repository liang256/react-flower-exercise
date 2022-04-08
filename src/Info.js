import React from 'react'
import './Info.css'

function Info(props) {
  const hasValue = (props.text !== '' && props.text !== null)

  if (!hasValue) {
    return <></>
  }

  return (
    <div className="tooltip">
        &#9432;
        <span className="tooltiptext">{props.text}</span>
    </div>
  )
}

export default Info
