import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {updateRow} from '../FlowerData';
import './Salary.css'
import LinkButton from '../LinkButton'

function Salary() {
    const salary = getSalary()
    const jobLevels = getJobLevels()

    const jobLevelsCheckBoxs = jobLevels.map((option, index)=> {
        return(
            <label 
                key={option} 
                className={salary.level[index] ? 'labelContainer checked' : 'labelContainer'}
            >
                {option}
                <input 
                    defaultChecked={salary.level[index]}
                    type='checkbox'
                    className='checkbox'
                    onChange={(e) => handCheckBoxOnChange(salary, 'level', index, e.target.checked)}
                ></input>
                <span className='checkmark'></span>
            </label>
        )
    })
    const otherIncomes = getOtherIncomeOptions()
    const [otherIncomeAnswers, setOtherIncomeAnswers] = useState(salary.otherIncome)
    const otherIncomeCheckBoxs = otherIncomes.map((option, index)=> {
        return (
            <label 
                key={option} 
                className={otherIncomeAnswers[index] ? 'labelContainer checked' : 'labelContainer'} 
                onClick={() => {
                    const newAnswers = salary.otherIncome.map((an, i) => {
                        return (i === index) ? !an : an
                    })
                    setOtherIncomeAnswers(newAnswers)
                }
            }>
                {option}
                <input
                    type='checkbox'
                    className='checkbox'
                    defaultChecked={salary.otherIncome[index]}
                    onChange={(e) => handCheckBoxOnChange(salary, 'otherIncome', index, e.target.checked)}
                ></input>
                {
                    (option === '其他' && salary.otherIncome[index]) 
                    && <input 
                        className='marginLeft'
                        type='text'
                        defaultValue={salary.otherIncomeText}
                        onChange={(e) => handTextInputOnChange(salary, 'otherIncomeText', e.target.value)}
                    ></input>
                }
                <span className='checkmark'></span>
            </label>
        )
    })
  return (
    <div className='salaryContainer'>
        <h3>1. 理想的工作等級？</h3>
        <div>
            {jobLevelsCheckBoxs}
        </div>
        <h3>2. 目標薪水</h3>
        <div>
            <input 
                type='text'
                className='salaryInput'
                defaultValue={salary.income}
                onChange={(e) => handTextInputOnChange(salary, 'income', e.target.value)}
            ></input>
        </div>
        <h3>3. 金錢以外的報酬</h3>
        <div>
            {otherIncomeCheckBoxs}
        </div>
        <div className='row center buttonContainer'>
            <LinkButton
                to='/'
                text='Next'
                onClick={updateFlowerData}
            />
        </div>
    </div>
  )
}

function getSalary() {
    const salary = sessionStorage.getItem('salary')
    if (salary === null) {
        initSessionSalay()
        return getSalary()
    } else {
        try {
            return JSON.parse(salary)
        } catch (e) {
            initSessionSalay()
        }
    }
}

function initSessionSalay() {
    const jobLevels = getJobLevels()
    const otherIncomes = getOtherIncomeOptions()

    const salary = {
        'level': Array(jobLevels.length).fill(false),
        'income': '100K',
        'otherIncome': Array(otherIncomes.length).fill(false),
        'otherIncomeText': ''
    }
    sessionStorage.setItem('salary', JSON.stringify(salary))
}

function getJobLevels() {
    return [
        '老闆或執行長 (這表示你必須開創自己的企業)',
        '經理或其他直接執行老闆命令的職位',
        '小組領導人',
        '等級相當的員工組成的團隊成員',
        '和另一位夥伴共同工作',
        '獨自工作：擔任公司內的員工或顧問，或者是自僱者'
    ]
}

function getOtherIncomeOptions() {
    return [
        '冒險',
        '挑戰',
        '尊敬',
        '影響力',
        '受歡迎',
        '名氣',
        '權力',
        '和共事者互相智力激盪',
        '發揮創意的機會',
        '幫助別人的機會',
        '領導別人的機會',
        '做決策的機會',
        '運用專長的機會',
        '帶領別人認識信仰的機會',
        '其他'
    ]
}

function handCheckBoxOnChange(salary, optionField, optionId, isChecked) {
    salary[optionField][optionId] = isChecked
    sessionStorage.setItem('salary', JSON.stringify(salary))
}

function handTextInputOnChange(salary, field, newValue) {
    salary[field] = newValue
    sessionStorage.setItem('salary', JSON.stringify(salary))
}

function updateFlowerData() {
    const salary = getSalary()
    const jobLevelOptions = getJobLevels()
    const jobLevels = salary.level.map((answer, index) => {
        if (answer) {
            return jobLevelOptions[index]
        } else {
            return null
        }
    }).filter(row => row !== null)
    const otherIncomeOptions = getOtherIncomeOptions()
    let needAppend = false
    let otherIncomes = salary.otherIncome
        .map((answer, index) => {
            if (answer && otherIncomeOptions[index] === '其他') {
                needAppend = true
                return null
            } else if (answer) {
                return otherIncomeOptions[index]
            } else {
                return null
            }
        })
        .filter(row => row !== null)
    if (needAppend) {
        otherIncomes.concat(salary.otherIncomeText.split(','))
    }
    
    updateRow('salary', '我想要的責任等級', jobLevels)
    updateRow('salary', '我偏好的薪資範圍', salary.income)
    updateRow('salary', '其他期望得到的報酬', otherIncomes)
}

export default Salary
