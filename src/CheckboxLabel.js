import React, { useState } from 'react'
import './CheckboxLabel.css'

/**
   * props: {
   *    isChecked
   *    text
   *    index
   *    setCheckboxValue
   *    enableExtraTextInput
   *    extraInputText
   *    setExtraTextValue
   * }
   */
function CheckboxLabel(props) {
    const [isChecked, setIsChecked] = useState(props.isChecked)
    
    const text = (props.index === undefined)
        ? props.text
        : props.index + '. ' + props.text

  return (
    <label
        className={isChecked ? 'checkboxLabelContainer checked' : 'checkboxLabelContainer'} 
        onClick={props.onClick}
    >
        {text}
        <input
            type='checkbox'
            className='checkbox'
            defaultChecked={isChecked}
            onChange={(e) => {
                props.setCheckboxValue(e.target.checked)
                setIsChecked(e.target.checked)
            }}
        ></input>
        {
            (props.enableExtraTextInput && isChecked) 
            && <input 
                className='extraTextInput'
                type='text'
                defaultValue={props.extraInputText}
                onChange={(e) => props.setExtraTextValue(e.target.value)}
            ></input>
        }
        <span className='checkmark'></span>
    </label>
  )
}

export default CheckboxLabel
