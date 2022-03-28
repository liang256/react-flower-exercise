import React, { 
    useState, 
    useRef 
} from 'react'
import { Link } from 'react-router-dom'
import {updateRow, getRow} from '../FlowerData'
import './Faith.css'

function Faith() {
    const cate = 'purpose'
    const title = '我的人生哲學'
    const factors = [
        {
            name: '美',
            question: '什麼樣的美會觸動你？美存在這世界上的功能是什麼？'
        },
        {
            name: '行為',
            question: '你認為我們在這世界上應有什麼樣的作為？'
        },
    ]

    const [notes, setNotes] = useState(Array(factors.length).fill(''))
    const [editingFactorIndex, setEditingFacotrIndex] = useState(null)
    const [checkedFactorIds, setCheckedFactorsIds] = useState(Array(factors.length).fill(false))
    const [onlyShowChecked, setOnlyShowChecked] = useState(false)
    const checkboxRefs = useRef([])
    const setInputRef = (i, isChecked) => {
        // console.log(i, checkboxRefs.current[i])
        checkboxRefs.current[i].checked = isChecked
    }
    let faith = getRow(cate, title)
    faith = (faith !== undefined) ? faith.text : ''
    const textareaRef = useRef()
    const handleSaveClick = () => {
        updateRow(cate, title, textareaRef.current.value)
    }

    const factorElements = factors.map((factor, index) => {
        let showInput = (editingFactorIndex == index || checkedFactorIds[index])
        let isShow = onlyShowChecked ? checkedFactorIds[index] : true

        if (!isShow) {
            return null
        }

        return (
            <div 
                key={factor.name} 
                className='factor' 
                onClick={(e) => handleFactorDivClick(e, index)}
            >
                <input type='checkbox' ref={el => checkboxRefs.current[index] = el} defaultChecked={checkedFactorIds[index]} onChange={(e) => {
                    e.stopPropagation()
                    checkedFactorIds[index] = e.target.checked
                    setCheckedFactorsIds(checkedFactorIds)
                    if (!e.target.checked) {
                        setEditingFacotrIndex(null)
                    }
                }}></input>
                <label><span>{factor.name + ': '}</span>{factor.question}</label>
                {showInput && <input 
                    defaultValue={notes[index]}
                    placeholder='可寫下觀點作為筆記'
                    onChange={(e) => {
                        e.stopPropagation()
                        notes[index] = e.target.value
                        setNotes(notes)
                        // if note has texts, auto check the checkbox
                        if (notes[index].length > 0) {
                            checkedFactorIds[index] = true
                            setCheckedFactorsIds(checkedFactorIds)
                            setInputRef(index, true)
                        } else {
                            checkedFactorIds[index] = false
                            setCheckedFactorsIds(checkedFactorIds)
                            setInputRef(index, false)
                        }
                    }
                }></input>}
            </div>
        )
    })

    function handleFactorDivClick(e, index) {
        e.stopPropagation()
        setEditingFacotrIndex(index)
        e.target.focus()
    }

    return (
        <div onClick={(e) => {
            // e.stopPropagation()
            console.log('master click')
            setEditingFacotrIndex(null)
        }}>
            <h2>我的人生哲學</h2>
            <p>寫下你的人生哲學，不用太長。文中要提到在下列各元素中，你覺得哪些最重要。<br/>挑選幾個，並用兩三句話解釋。</p>
            <div className='factorContainer'>
                {factorElements}
            </div>
            <div className='row'>
                <input type='checkbox' onClick={(e) => {setOnlyShowChecked(e.target.checked)}}></input><label>只顯示有勾選元素</label>
            </div>
            
            <textarea ref={textareaRef} placeholder='將觀點彙整於此' defaultValue={faith}></textarea>
            <button
                onClick={() => handleSaveClick()}
            >
                <Link to='/'>Save</Link>
            </button>
        </div>
    )
}

export default Faith
