import React from 'react'
import './Compare.css'

class Compare extends React.Component {
    constructor(props) {
        super(props)
        
        const factors = ['情緒化', '一板一眼', '沒有共同興趣', '常推卸責任', '反應慢']

        this.state = {
            factors: factors,
            history: [],
            queue: generatePairsByIndex(factors),
            point: 1
        }
    }

    handleClickOption(pair, id, point) {
        // console.log(pair + ': option(' + id + ') is selected')
        const history = this.state.history
        const result = {pair: pair, winner: id, point: point}
        var queue = this.state.queue.filter(uncomparePair => uncomparePair !== pair)
        var statePoint = this.state.point
        history.push(result)

        // check if game end
        const score = countScore(history)
        // console.log(score)
        if (queue.length == 0) {
            // check if same score
            console.log('end, checking if need next round...')
            const scoreFactorIdMap = {}
            for (const factorId in score) {
                const factorScore = score[factorId]
                if (scoreFactorIdMap[factorScore] ===  undefined) {
                    scoreFactorIdMap[factorScore] = []
                } 
                scoreFactorIdMap[factorScore].push(factorId)
            }
            console.log('print out score map:')
            console.log(scoreFactorIdMap)
            var needNextRound = false
            for (const score in scoreFactorIdMap) {
                // console.log(factorIds)
                const factorIds = scoreFactorIdMap[score]
                if (factorIds.length > 1) {
                    needNextRound = true
                    queue = queue.concat(generatePairsByValue(factorIds))
                }
            }
            if (needNextRound) {console.log('yes, we need next round...')}
            statePoint = needNextRound ? (statePoint / 2) : statePoint
        }

        this.setState({history: history, queue: queue, point: statePoint})
    }

    render() {
        const factors = this.state.factors
        const status = 'factors: ' + this.state.factors
        const history = this.state.history
        const point = this.state.point
        var queue = this.state.queue

        const comparePairs = queue.map(pair => {
            const ids = pair.split("-")
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
                {/* <span>{score}</span> */}
            </div>
        )
    }
}

function countScore(history) {
    const score = {}
    for (const result of history) {
        if (score[result.winner] === undefined) {
            score[result.winner] = result.point
        } else {
            score[result.winner] += result.point
        }
    }
    return score
}

function generatePairsByIndex(factors) {
    const queue = []
    const fac_len = factors.length
    for (var l_i = 0; l_i < fac_len - 1; l_i++) {
        for (var r_i = l_i + 1; r_i < fac_len; r_i++) {
            const key = l_i + '-' + r_i
            queue.push(key)
        }
    }
    return queue
}

function generatePairsByValue(ids) {
    const queue = []
    const len = ids.length
    for (var l_i = 0; l_i < len - 1; l_i++) {
        for (var r_i = l_i + 1; r_i < len; r_i++) {
            const key = ids[l_i] + '-' + ids[r_i]
            queue.push(key)
        }
    }
    return queue
}

export default Compare
