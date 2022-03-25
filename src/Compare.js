import React from 'react'
import { 
  Link,
  useSearchParams,
  Redirect
} from 'react-router-dom'
import './Compare.css'

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
    if (queue.length == 0) {
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
    if (queue.length == 0) {
      const history = this.state.history
      const factors = this.props.factors
      const score = countScore(history, factors)
      console.log('final his', history)
      console.log('final score', score)
      const sortedFactors = score.sort((a, b) => {
        return a.score - b.score
      }).map(factor => factors[factor.id])
      console.log(factors, sortedFactors)
      return (<Link to={
        '/rewrite?cate=' + this.props.cate
        + '&title=' + this.props.title
        + '&factors=' + sortedFactors
      }>
        Next Step
      </Link>)
    }

    const comparePairs = queue.map(pair => {
      const ids = pair.split('-')
      const l_i = ids[0]
      const r_i = ids[1]
      return (
        <div key={pair} className='optionContainer'>
            <div key={pair + '_' + l_i} className='option optionLeft' onClick={() => this.handleClickOption(pair, l_i, point)}>{factors[l_i]}</div>
            <div key={pair + '_' + r_i} className='option optionRight' onClick={() => this.handleClickOption(pair, r_i, point)}>{factors[r_i]}</div>
        </div>
      )
    })

    return (
      <div>
          <span>{status}</span>
          {comparePairs}
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
