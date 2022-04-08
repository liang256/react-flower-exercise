import React from 'react'
import './Compare.css'
import { updateRow } from './FlowerData'
import LinkButton from './LinkButton'

class Compare extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      history: [],
      queue: generatePairsByIndex(this.props.factors),
      point: 1
    }
  }

  handleClickOption (pair, id, point) {
    // console.log(pair + ': option(' + id + ') is selected')
    const history = this.state.history
    const result = { pair: pair, winner: parseInt(id), point: point }
    let queue = this.state.queue.filter(uncomparePair => uncomparePair !== pair)
    let statePoint = this.state.point
    history.push(result)

    // check if game end
    if (queue.length === 0) {
      // check if same score
      console.log('end, checking if need next round...')
      const score = countScore(history, this.props.factors)
      console.log('print score', score)
      const scoreFactorIdMap = {}
      for (const factor of score) {
        if (scoreFactorIdMap[factor.score] === undefined) {
          scoreFactorIdMap[factor.score] = []
        }
        scoreFactorIdMap[factor.score].push(factor.id)
      }
      console.log('print out score map:')
      console.log(scoreFactorIdMap)
      let needNextRound = false
      for (const score in scoreFactorIdMap) {
        // console.log(factorIds)
        const factorIds = scoreFactorIdMap[score]
        if (factorIds.length > 1) {
          needNextRound = true
          queue = queue.concat(generatePairsByValue(factorIds))
        }
      }
      if (needNextRound) { 
        console.log('yes, we need next round...')
        statePoint *= 0.5
      }
    }

    this.setState({ history: history, queue: queue, point: statePoint })
  }

  render () {
    const factors = this.props.factors
    const status = 'factors: ' + this.props.factors.length
    const point = this.state.point
    const queue = this.state.queue

    // If the compare ends
    if (queue.length === 0) {
      const history = this.state.history
      const factors = this.props.factors
      const score = countScore(history, factors)
      // console.log('final his', history)
      // console.log('final score', score)
      const sortedFactors = score.sort((a, b) => {
        // sort is asc
        return a.score - b.score
      })
      // console.log(factors, sortedFactors)
      const showScoreName = []
      const showScore = []
      sortedFactors.forEach((row, i) => {
        showScoreName.push(<span className='scoreName' key={row.id}>{factors[row.id]}</span>)
        showScore.push(<span className='scoreText' key={row.id}>{row.score}</span>)
      })
      // render this if the compare ends
      return (
        <div>
          <div className='comparePairContainer'>
            <p className='descText'>Scores</p>
            <div className='scoreTable'>
              <div className='scoreTableNameCol'>{showScoreName}</div>
              <div className='scoreTableScoreCol'>{showScore}</div>
            </div>
          </div>
          <div className='comparePairContainer btnContainer'>
            {this.props.selectPositive
            ? <LinkButton
              to='/'
              text='Save'
              onClick={updateRow(
                this.props.cate, 
                this.props.title, 
                sortedFactors.reverse().map(factor => factors[factor.id])
              )}
            />
            : <LinkButton
              to={
                '/rewrite?cate=' + this.props.cate
                + '&title=' + this.props.title
                + '&factors=' + sortedFactors.reverse().map(factor => factors[factor.id])
              }
              text = 'Next'
            />}
          </div>
        </div>
      )
    }

    const comparePairs = (queue) => {
      if (!queue.length > 0) {
        return null
      }
      const pair = queue[0]
      const ids = pair.split('-')
      const l_i = ids[0]
      const r_i = ids[1]
      return (
        <div key={pair} className='optionContainer'>
            <div key={pair + '_' + l_i} className='option optionLeft' onClick={() => this.handleClickOption(pair, l_i, point)}>{factors[l_i]}</div>
            <div key={pair + '_' + r_i} className='option optionRight' onClick={() => this.handleClickOption(pair, r_i, point)}>{factors[r_i]}</div>
        </div>
      )
    }

    return (
      <div>
          <div className='comparePairContainer header'>
            <span className='headerText'>{status}</span>
            <span className='headerText'>{'queue: ' + (queue.length - 1)}</span>
          </div>
          <div className='comparePairContainer body'>
            {comparePairs(queue)}
          </div>
          <div className='comparePairContainer'>
            <p className='descText'>比較左右選項，選擇讓你比較「{this.props.selectPositive ? '喜歡' : '討厭'}」的。</p>
          </div>
      </div>
    )
  }
}

function countScore (history, factors) {
  var score = factors.map((factor, index) => {
    return {id: index, score: 0}
  })
  for (const result of history) {
    var targetIndex = score.findIndex(row => row.id === parseInt(result.winner))
    if (targetIndex === -1) {
      score.push({id: result.winner, score: result.point})
    } else {
      score[targetIndex].score += result.point
    }
  }
  return score
}

function generatePairsByIndex (factors) {
  const queue = []
  const fac_len = factors.length
  for (let l_i = 0; l_i < fac_len - 1; l_i++) {
    for (let r_i = l_i + 1; r_i < fac_len; r_i++) {
      const key = l_i + '-' + r_i
      queue.push(key)
    }
  }
  return queue
}

function generatePairsByValue (ids) {
  const queue = []
  const len = ids.length
  for (let l_i = 0; l_i < len - 1; l_i++) {
    for (let r_i = l_i + 1; r_i < len; r_i++) {
      const key = ids[l_i] + '-' + ids[r_i]
      queue.push(key)
    }
  }
  return queue
}

export default Compare
