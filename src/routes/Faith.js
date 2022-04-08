import React, { 
    useState, 
    useRef
} from 'react'
import {updateRow, getRow} from '../FlowerData'
import './Faith.css'
import {getQuestions} from '../FaithConfig'
import LinkButton from '../LinkButton'
import CheckboxLabel from '../CheckboxLabel'

function Faith() {
    const cate = 'purpose'
    const title = '我的人生哲學'
    const factors = getQuestions()

    const [notes, setNotes] = useState(Array(factors.length).fill(''))
    const [checkedFactorIds, setCheckedFactorsIds] = useState(Array(factors.length).fill(false))
    const [onlyShowChecked, setOnlyShowChecked] = useState(false)

    const checkedAmount = checkedFactorIds.filter(val => val === true).length

    let faith = getRow(cate, title)
    faith = (faith !== undefined) ? faith.text : ''
    const textareaRef = useRef()

    const handleSaveClick = () => {
        updateRow(cate, title, textareaRef.current.value)
    }

    const factorElements = factors.map((factor, index) => {
        let showInput = checkedFactorIds[index]
        let isShow = onlyShowChecked ? checkedFactorIds[index] : true

        if (!isShow) {
            return null
        }

        return (
            <CheckboxLabel
                key={index + 1}
                index={index + 1}
                text={factor.question}
                isChecked={checkedFactorIds[index]}
                setCheckboxValue={(newValue) => {
                    const newCheckedFactorIds = checkedFactorIds.map((isCheck, i) => {
                        return (i === index) ? newValue : isCheck
                    })
                    setCheckedFactorsIds(newCheckedFactorIds)
                    const checkedCount = newCheckedFactorIds.filter(v => v === true)
                    if (checkedCount.length === 0) {
                        setOnlyShowChecked(false)
                        
                    }
                }}
                enableExtraTextInput={showInput}
                extraInputText={notes[index]}
                setExtraTextValue={(newValue) => {
                    const newNotes = notes.map((n, i) => {
                        return (i===index) ? newValue : n
                    })
                    setNotes(newNotes)
                }}
            />
        )
    })    

    return (
        <div 
            className='faithContainer'
        >
            <p>請從下列各元素中，勾選你覺得重要的，並寫上觀點作為下一步的參考。</p>
            <div className='optionContainer'>
                {factorElements}
            </div>
            <div className='showCheckedButtonContainer'>
                {checkedAmount > 0 && <label
                    className={onlyShowChecked ? 'checkboxLabelContainer checked' : 'checkboxLabelContainer'} 
                >
                    只顯示有勾選元素
                    <input
                        type='checkbox'
                        className='checkbox'
                        defaultChecked={onlyShowChecked}
                        onChange={(e) => {
                            setOnlyShowChecked(e.target.checked)
                        }}
                        disabled={checkedAmount === 0 ? true : false}
                    ></input>
                    <span className='checkmark'></span>
                </label>}
            </div>
            
            <p>總結上面觀點，寫下你的人生哲學。</p>
            <textarea 
                className='purposeTextarea'
                ref={textareaRef} 
                placeholder='將觀點彙整於此' 
                defaultValue={faith}
            ></textarea>
            <div className='row center buttonContainer'>
                <LinkButton
                    to='/'
                    text='Save'
                    onClick={handleSaveClick}
                />
            </div>
        </div>
    )
}

export default Faith
