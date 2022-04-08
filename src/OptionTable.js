import React, { useState } from 'react'
import './OptionTable.css'
import getColDesc from './OptionTableConfig'
import LinkButton from './LinkButton'
import Factor from './Factor'
import NewFactorInput from './NewFactorInput'
import Info from './Info'

function OptionTable (props) {
  const defaultFactors = (props.cate === 'colleague') ? ['易怒 (範例)'] : []
  const [factors, setFactors] = useState(defaultFactors)
  const [editingFactorIndex, setEditingFactorIndex] = useState(null)
  const [nextStepBtnEnable, setNextStepBtnEnable] = useState(false)

  const removeFactor = (i) => {
    const newFactors = factors.filter((f, index) => index !== i)
    setFactors(newFactors)
    canEnableNextStepBtn(newFactors)
  }

  const canEnableNextStepBtn = (f) => {
    setNextStepBtnEnable(f.length >= 5)
  }

  const updateFactor = (i, newVal) => {
    let newFactors = factors.slice()
    let hasSameVal = newFactors.findIndex(f => f === newVal)
    hasSameVal = (hasSameVal !== -1)
    if (!hasSameVal) {
      newFactors = newFactors.map((f, index) => {
        if (index === i) {
          return newVal
        }
        return f
      })
      setFactors(newFactors)
    }
    setEditingFactorIndex(null)
  }

  const createFactor = (val) => {
    const newFactors = factors.slice()
    let hasSameVal = newFactors.findIndex(f => f === val)
    hasSameVal = (hasSameVal !== -1)
    if (!hasSameVal) {
      newFactors.push(val)
      setFactors(newFactors)
    }
    canEnableNextStepBtn(newFactors)
  }

  const startToEditFactor = (i) => {
    setEditingFactorIndex(i)
  }

  const handleClick = () => {
    setEditingFactorIndex(null)
  }

    const factorElements = factors.map((factor, index) => {
      return (
          <Factor
              value={factor}
              isEditing={editingFactorIndex == index}
              key={factor}
              index={index}
              removeFactor={removeFactor}
              updateFactor={updateFactor}
              startToEditFactor={startToEditFactor}
          />
      )
    })

    const colDesc = getColDesc(props.cate, props.title)

    if (colDesc === undefined) {
      return <div className='row center'>unvalid category and title given</div>
    }

    return (
      <div>
          <div className='table'>
              <div className='row'>
                  <div className='column row space-evenly'>
                      <span className='header'>{colDesc[0].header}</span>
                  </div>
                  <div className='column row space-evenly'>
                      <span className='header'>
                        {colDesc[1].header} 
                        <Info text={colDesc[1].placeholder}/>
                      </span>
                  </div>
              </div>
              <div className='row'>
                  <div className='column'>
                    <textarea autoFocus={true} rows="20" placeholder={colDesc[0].placeholder}></textarea>
                  </div>
                  <div className='column'>
                      <div className='factorContainer' onClick={handleClick}>
                        {factorElements}
                      </div>
                      <div className='newFactorInputContainer'>
                          <NewFactorInput
                            setEditingIndex={setEditingFactorIndex}
                            createFactor={createFactor}
                          />
                      </div>
                  </div>
              </div>
          </div>
          <div className='row center buttonContainer'>
            <LinkButton 
              to={
                '/compare?cate=' + props.cate
                + '&title=' + props.title
                + '&factors=' + factors
              }
              text = 'Sort'
              enable = {nextStepBtnEnable}
            />
          </div>
      </div>
    )

}

function unique (arr) {
  return [...new Set(arr)]
}

export default OptionTable
