import React from 'react'
import './NewFactorInput.css'

function NewFactorInput(props) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            props.createFactor(e.target.value)
            e.target.value = ''
        }
    }
    return (
        <input
            className='newFactorInput'
            placeholder={props.placeholder == undefined ? '新增因素' : props.placeholder}
            onKeyDown={(e) => handleKeyDown(e)}
        ></input>
    )
}

export default NewFactorInput
