import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Factor from '../Factor'
import NewFactorInput from '../NewFactorInput'
import './FindKnowledges.css'
import LinkButton from '../LinkButton'

function FindKnowledges() {
    const [factors, setFactors] = useState([
        {name: '漫畫', cate: 0},
        {name: '餐旅服務業', cate: 11},
        {name: '行政及後勤支援服務', cate: 11},
        {name: '農業、糧食、自然資源', cate: 11},
        {name: '建築、工程、營造', cate: 11},
        {name: '商業、工程、營造', cate: 11},
        {name: '藝術、影音科技、通訊', cate: 11},
        {name: '商業、營運、管理、監督', cate: 11},
        {name: '社區與社會服務', cate: 11},
        {name: '電腦與數學運算', cate: 11},
        {name: '設計、娛樂、體育、媒體', cate: 11},
        {name: '通路物流', cate: 11},
        {name: '教育、訓練、圖書館', cate: 11},
        {name: '休閒娛樂', cate: 11},
        {name: '農林漁獵', cate: 11},
        {name: '金融保險', cate: 11},
        {name: '備餐與送餐', cate: 11},
        {name: '行政與公共行政', cate: 11},
        {name: '綠能產業或工作', cate: 11},
        {name: '健康管理、健康科學、社會救助', cate: 11},
        {name: '觀光餐旅', cate: 11},
        {name: '公共服務', cate: 11},
        {name: '資訊與資訊科技', cate: 11},
        {name: '法律、公共安全、矯正、保全', cate: 11},
        {name: '生命科學、物理、社會科學', cate: 11},
        {name: '公司與企業管理', cate: 11},
        {name: '製造業', cate: 11},
        {name: '行銷、銷售、客服', cate: 11},
        {name: '軍事相關產業', cate: 11},
        {name: '採礦、採石、開採石油與天然氣', cate: 11},
        {name: '個人護理服務', cate: 11},
        {name: '生產', cate: 11},
        {name: '專業、科學、科技服務', cate: 11},
        {name: '保護服務', cate: 11},
        {name: '不動產、房屋租賃', cate: 11},
        {name: '宗教信仰相關產業', cate: 11},
        {name: '零售業與相關產業', cate: 11},
        {name: '科學、科技、工程、數學', cate: 11},
        {name: '自僱', cate: 11},
        {name: '運輸、倉儲、貨運', cate: 11},
        {name: '公營事業', cate: 11}
    ])
    const [editingFactorIndex, setEditingFactorIndex] = useState(null)

    const questions = [
        '你最喜歡的嗜好，或是你願意花最多時間的領域。電腦？園藝？日文？繪畫？社會學？',
        '你最喜歡聊什麼？假如你和一個人被困在荒島，但這個人只能聊少數話題，你希望聊哪些主題？',
        '你喜歡讀哪些雜誌文章？什麼主題？你看到什麼雜誌文章標題會特別感興趣？',
        '逛書店的時候，你最容易被哪一區的書吸引？哪一主題的書讓你著迷？',
        '上網的時候最容易被什麼網站吸引？網站的主題是什麼？有什麼令你驚艷之處？',
        '看電視的時候，假如正在播益智問答節目，你會選什麼領域的問題？如果是教育性質頻道，你會因為什麼主題而停下來看？',
        '你正在瀏覽你家附近或線上開的課程，你對什麼主題最有興趣？',
        '假如你有機會寫一本書，寫的不是關於你自己或其他人的人生，書的主題會是什麼？',
        '曾經做什麼事讓你廢寢忘食？是什麼樣的工作、什麼主題這麼吸引你的注意？',
        // 漁夫之網問題
        '我從過去的工作學到什麼？',
        '我過去在工作以外的時間學會什麼？',
        '我覺得什麼領域、職業、產業聽起來很有趣？',
        '其他我曾有過的靈感、好點子、突發奇想'
    ]

    const updateFactor = (index, value) => {
        // add a new factor, and assign category to given index
        // console.log('trigger update f', index, value)
        factors[index].name = value
        setFactors(factors)
        setEditingFactorIndex(null)
    }

    const clearFactorsOfCate = (cateId) => {
        const newFactors = factors
            .filter(f => f.cate !== cateId)

        setFactors(newFactors)
    }

    const startToEditFactor = (index) => {
        setEditingFactorIndex(index)
    }

    const removeFactor = (index) => {
        const newFactors = factors.filter((f, i) => i !== index)
        setFactors(newFactors)
    }

    const createFactor = (name, cateId) => {
        const newFactors = factors.slice()
        let hasFactor = newFactors.findIndex(f => f.name == name && f.cate == cateId)
        hasFactor = (hasFactor !== -1)
        if (!hasFactor) {
            newFactors.push({
                name: name,
                cate: cateId
            })
            setFactors(newFactors)
        }
    }
    
    const getUniqueFactors = () => {
        const names = factors.map(f => f.name)
        return [...new Set(names)]
    }

    const generateFactors = (cate) => {
        const collect = []
        for (let i=0; i<factors.length; i++) {
            if (factors[i].cate === cate) {
                collect.push(
                    <Factor 
                        key={'_' + i + factors[i].name}
                        value={factors[i].name}
                        index={i}
                        updateFactor={updateFactor}
                        startToEditFactor={startToEditFactor}
                        removeFactor={removeFactor}
                        isEditing={editingFactorIndex === i ? true : false}
                    />
                )
            }
        }
        return collect
    }

    const disableEditing = () => {
        setEditingFactorIndex(null)
    }

    const sectionOneQuestionRows = questions.map((q, qIndex) => {
        const factorsElements = generateFactors(qIndex)
        const hasFactorElements = factorsElements.length > 0
        return (
            <li key={q}>
                <p className='questionText'>{q}</p>
                {
                    hasFactorElements  
                    && (<div className='knowlegeFactorContainer'>{factorsElements}</div>)
                }
                <div className='row controlContainer'>
                    <NewFactorInput createFactor={(name) => createFactor(name, qIndex)}/>
                    {
                        factors.findIndex(f => f.cate === qIndex) !== -1 
                        && <button 
                            className='clearBtn' 
                            onClick={() => clearFactorsOfCate(qIndex)}
                        >
                            Clear
                        </button>
                    }
                </div>
            </li>
        )
    }) 
    return (
        <div className='FindKnowledgeContainer'
            onClick={(e) => {
                e.stopPropagation()
                disableEditing()
            }}
        >
            <p>在這個階段，我們需要盡可能列出我們有興趣的領域、知識、主題。越多越好，之後會再排序。</p>
            <p>你可以跟著下列引導問題實作，也可以直接填寫。</p>
            {/* <h2>#1 九個問題</h2> */}
            <ol>
                {sectionOneQuestionRows}
            </ol>
            <div className='row center buttonContainer'>
                <LinkButton 
                    to={'/knowledges?factors='+getUniqueFactors()}
                    text='Next'
                    enable={factors.length > 9 ? true : false}
                />
            </div>
            
        </div>
    )
}

export default FindKnowledges
