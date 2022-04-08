import React from 'react'
import './NewFactorInput.css'

function NewFactorInput(props) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            props.createFactor(e.target.value)
            e.target.value = ''
        }
    }

    const handleClick = (e) => {
        e.stopPropagation()
        if (props.setEditingIndex !== undefined) {
            props.setEditingIndex(null)
        }
    }

    return (
        <input
            onClick={(e) => handleClick(e)}
            className='newFactorInput'
            placeholder={props.placeholder === undefined ? '新增因素' : props.placeholder}
            onKeyDown={(e) => handleKeyDown(e)}
        ></input>
    )
}

export default NewFactorInput
