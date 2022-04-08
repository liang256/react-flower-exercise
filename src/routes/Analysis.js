import React from 'react'
import { useParams } from 'react-router-dom'
import { getQuestions } from '../SkillQuestions'
import './Analysis.css'
import CheckboxLabel from '../CheckboxLabel'
import LinkButton from '../LinkButton'
import { getAllAnalysis, getAnalysisByStoyId} from '../StoryModule'

function Analysis() {
    const params = useParams()
    const storyId = parseInt(params.storyId, 10)
    const allAnalysis = getAllAnalysis()
    const answers = getAnalysisByStoyId(allAnalysis, storyId)
    const questions = getQuestions()

    const handleCheckBoxClick = (storyId, questionId, isChecked) => {
        const analysis = getAllAnalysis()
        analysis[storyId]['answers'][questionId] = isChecked
        analysis[storyId]['isFinished'] = true
        sessionStorage.setItem('analysis', JSON.stringify(analysis))
    }
    const questionRows = []
    for (let index = 0; index < questions.length; index++) {
        questionRows.push(
            <CheckboxLabel
                key={storyId + '-' + index}
                text={questions[index]}
                index={index + 1}
                isChecked={answers['answers'][index]}
                setCheckboxValue={(isChecked) => handleCheckBoxClick(storyId, index, isChecked)}
            />
        )
    }

  return (
    <div>
      <div className='questionContainer'>
        {questionRows}
      </div>
        <div className='row center buttonContainer'>
            <LinkButton to='/stories' text='Save'/>
        </div>
    </div>
  )
}

export default Analysis
