import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllAnalysis, initAllAnalysis } from '../StoryModule'
import { getQuestions } from '../SkillQuestions'
import LinkButton from '../LinkButton'
import './Stories.css'

function Stories() {
    let stories = JSON.parse(sessionStorage.getItem('stories'))
    const analysis = getAllAnalysis()
    const [factors, setFactors] = useState(getTopFactors(analysis))
    const topFactors = factors.map(f => <li key={f}>{f}</li>)

    const handleClearClick = () => {
      const init = initAllAnalysis()
      setFactors(getTopFactors(init))
    }

    stories = Array.isArray(stories) ? stories : []
    const storyCards = stories.map((story, index) => {
      const hasAnswersOfThisStory = (
        analysis[index] !== undefined
        && analysis[index] === Object(analysis[index])
      )
      const isAnalysisDone = hasAnswersOfThisStory && analysis[index].isFinished

      return (
        
          <div className='storyCard' key={index}>
            <Link to={'/stories/' + index}>
              <div className='storyButton'>
                <span className='storyTitle'>{story.title}</span>
                <article>{story.content === null ? '' : story.content.substring(0, 25) + '...'}</article>
              </div>
            </Link>
            <Link to={'/stories/' + index + '/analysis'}>
              <div className='analysisButton'>
                <span>Analysis</span>
                {isAnalysisDone && <div className='check'></div>}
              </div>
            </Link>
          </div>
      )
    })
    const nextStoryId = stories.length
    // console.log('in stories.js')
  return (
    <div className='storyIndexContainer'>
      {
        stories.length === 0 
        ? <p>has no story yet, please create one!</p> 
        : <div className='storyCardContainer'>{storyCards}</div>
      }

      <div className='row center buttonContainer'>
        <LinkButton
          to={'/stories/'+nextStoryId}
          text='New'
        />
      </div>

      <div className='topFactorsContainer'>
        
        <span className='topFactorHeader'>Top Factors</span>
        <hr/>
        <ol>{topFactors}</ol>
      </div>
      
      <div className='row center buttonContainer'>
        <LinkButton
          to='#'
          text='Clear'
          onClick={handleClearClick}
        />
        &nbsp;
        &nbsp;
        <LinkButton
          to={'/compare/?factors=' + factors + '&cate=skill&title=我最愛的能力'}
          text='Sort'
          enable={factors.length < 15}
        />
      </div>
    </div>
  )
}

function getTopFactors(analysis, length = 10) {
  const questions = getQuestions()
  const scores = questions.map(q => {
    return {factor: q, score: 0}
  })

  // count total score of each questions
  analysis.forEach(an => {
    if (an === null || an.answers === undefined) {
      return
    }
    for (let i = 0; i<questions.length; i++) {
      if (an.answers[i]) {
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
