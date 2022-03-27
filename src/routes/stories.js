import React from 'react'
import { Link } from 'react-router-dom'
import {getAllAnalysis} from '../AnalysisRepository'
import { getQuestions } from '../SkillQuestions'

function Stories() {
    let stories = JSON.parse(sessionStorage.getItem('stories'))
    const analysis = getAllAnalysis()
    const factors = getTopFactors(analysis)
    stories = Array.isArray(stories) ? stories : []
    stories = stories.map((story, index) => {
      return (
        <li key={index}>
          <Link to={'/stories/' + index}>{story.title}</Link>
          <button>
            <Link to={'/stories/' + index + '/analysis'}>分析</Link>
          </button>
          {analysis[index] !== undefined && 'O'}
        </li>
      )
    })
    const nextStoryId = stories.length
    // console.log('in stories.js')
  return (
    <div>
      {stories.length == 0 ? 'has no story yet, please create one!' : <ul>{stories}</ul>}
      <button>
        <Link to={'/stories/'+nextStoryId}>New Story</Link>
      </button>
      <button>
        <Link to={'/compare/?factors=' + factors + '&cate=skill&title=我最愛的能力'}>Sort</Link>
      </button>
    </div>
  )
}

function getTopFactors(analysis, length = 10) {
  const questions = getQuestions()
  const scores = questions.map(q => {
    return {factor: q, score: 0}
  })
  // count total score of each questions
  analysis.forEach(answers => {
    for (let i = 0; i<questions.length; i++) {
      if (answers[i]) {
        scores[i].score++
      }
    }
  })
  // sort factors by scores in desc
  scores.sort((a, b) => b.score - a.score)

  // get the first 10 factors
  // if there are factors have even score with the 10th factor
  // also return them
  let lastFactorIndex = length - 1
  const lastFactorScore = scores[lastFactorIndex].score
  for (let i = lastFactorIndex + 1; i< scores.length; i++) {
    if (scores[i].score === lastFactorScore) {
      lastFactorIndex++
    } else {
      break
    }
  }
  let resultFactors = scores.slice(0, lastFactorIndex + 1).map(row => row.factor)
  return resultFactors
}

export default Stories
