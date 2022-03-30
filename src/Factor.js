import React from 'react'
import './Factor.css'

function Factor(props) {
  /**
   * props: {
   *  startToEditFactor: click to edit props.value
   *  removeFactor: click to remove this factor
   *  updateFactor: to finish edition (after onClick)
   *  value: the name of this factor
   *  isEditing: if is editing show input element to edit value
   *  index: index of this factor
   * }
   */
  const handleClick = (e) => {
    e.stopPropagation()
    props.startToEditFactor(props.index)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    // console.log('click d', props.index, props.removeFactor)
    props.removeFactor(props.index)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // console.log('enter', e.target.value)
      if (e.target.value === '') {
        props.removeFactor(props.index)
      } else {
        props.updateFactor(props.index, e.target.value)
      }
    }
  }

  if (props.value === '') {
    return null
  }

  return (
    <div
        className='editableFactor'
        onClick={(e) => handleClick(e)}
    >
        <button 
          className='factorDelete' 
          onClick={(e) => handleDeleteClick(e)}
        >
          <span>x</span>
        </button>
        {/* <div className='factorTextContainer'> */}
        {
            props.isEditing
              ? <input 
                className='factorEditInput' 
                defaultValue={props.value} 
                onKeyDown={(e) => handleKeyDown(e)} 
                autoFocus
              ></input>
              : <span>{props.value}</span>
        }
        {/* </div> */}
    </div>
  )
}

export default Factor
