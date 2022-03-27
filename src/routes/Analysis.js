import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuestions } from '../SkillQuestions'
import './Analysis.css'

function Analysis() {
    const params = useParams()
    const storyId = parseInt(params.storyId, 10)
    const allAnalysis = getAllAnalysis()
    const answers = getAnalysis(allAnalysis, storyId)
    const questions = getQuestions()
    // console.log(questions)
    const questionRows = []
    for (let index = 0; index < questions.length; index++) {
        questionRows.push(
            <div className='questionRow' key={questions[index]}>
                <div className='questionText'>{questions[index]}</div>
                <input
                    key={storyId + '-' + index}
                    type='checkbox' 
                    defaultChecked={answers[index]}
                    onChange={(e) => handleCheckBoxClick(storyId, index, e.target.checked)}
                >
                </input>
            </div>
        )
    }

  return (
    <div>
      analysis story: {storyId}
      <div className='questionContainer'>
        {questionRows}
      </div>
      <button>
          <Link to='/stories'>Next</Link>
      </button>
    </div>
  )
}

function getAllAnalysis() {
    let analysis = sessionStorage.getItem('analysis')
    if (analysis === null) {
        sessionStorage.setItem('analysis', JSON.stringify([]))
    }
    try {
        analysis = JSON.parse(analysis)
    } catch (e) {
        analysis = []
    }
    return analysis
}

function getAnalysis(arr, id) {
    return (arr[id] === undefined) 
        ? initAnalysis(id)
        : arr[id]
}

function initAnalysis(id) {
    const analysis = getAllAnalysis()
    const qestions = getQuestions()
    const answer = Array(qestions.length).fill(false)
    analysis[id] = answer
    console.log('hey', analysis)
    sessionStorage.setItem('analysis', JSON.stringify(analysis))
    return answer
}

function handleCheckBoxClick(storyId, questionId, isChecked) {
    const analysis = getAllAnalysis()
    // console.log(storyId, questionId, isChecked)
    analysis[storyId][questionId] = isChecked
    console.log(analysis[storyId], analysis[storyId][questionId])
    sessionStorage.setItem('analysis', JSON.stringify(analysis))
}

export default Analysis
