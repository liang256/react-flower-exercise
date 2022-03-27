import React from 'react'
import { Link } from 'react-router-dom'
import updateRow from '../FlowerData';

function Salary() {
    const salary = getSalary()
    const jobLevels = getJobLevels()
    
    console.log(salary, jobLevels)
    const jobLevelsCheckBoxs = jobLevels.map((option, index)=> {
        return(
            <div key={option} >
                <input 
                    defaultChecked={salary.level[index]}
                    type='checkbox'
                    onChange={(e) => handCheckBoxOnChange(salary, 'level', index, e.target.checked)}
                ></input>
                <label>{option}</label>
            </div>
        )
    })
    const otherIncomes = getOtherIncomeOptions()
    const otherIncomeCheckBoxs = otherIncomes.map((option, index)=> {
        return (
            <div key={option}>
                <input
                    type='checkbox'
                    defaultChecked={salary.otherIncome[index]}
                    onChange={(e) => handCheckBoxOnChange(salary, 'otherIncome', index, e.target.checked)}
                ></input>
                <label>{option}</label>
                {
                    option === '其他' && <input 
                        type='text'
                        defaultValue={salary.otherIncomeText}
                        onChange={(e) => handTextInputOnChange(salary, 'otherIncomeText', e.target.value)}
                    ></input>
                }
            </div>
        )
    })
  return (
    <div>
        <h3>理想的工作等級？</h3>
        <div>
            {jobLevelsCheckBoxs}
        </div>
        <h3>目標薪水</h3>
        <div>
            <input 
                defaultValue={salary.income}
                onChange={(e) => handTextInputOnChange(salary, 'income', e.target.value)}
            ></input>
        </div>
        <h3>金錢以外的報酬</h3>
        <div>
            {otherIncomeCheckBoxs}
        </div>
        <button onClick={() => updateFlowerData()}>
            <Link to='/'>Next Step</Link>
        </button>
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
    const needAppend = false
    let otherIncomes = salary.otherIncome
        .map((answer, index) => {
            if (answer && otherIncomeOptions[index] == '其他') {
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
