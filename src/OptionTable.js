import React from 'react'
import './OptionTable.css'
import { Link } from 'react-router-dom'

class OptionTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      factors: [],
      editingKey: null
    }
  }

  handleFactorClick (key) {
    console.log('factor click', key)
    this.setState({
      editingKey: key
    })
  }

  handleFactorInputKeyDown (e) {
    if (e.key === 'Enter') {
      // update target factor
      const key = e.target.defaultValue
      const newValue = e.target.value
      const newFactors = this.state.factors.slice()

      // check if duplicated factor given
      if (!newFactors.includes(newValue)) {
        for (let i = 0; i < newFactors.length; i++) {
          if (newFactors[i] == key) {
            if (newValue == '') {
              // remove the factor
              newFactors.splice(i, 1)
            } else {
              newFactors[i] = newValue
            }
          }
        }
      }

      this.setState({
        factors: unique(newFactors),
        editingKey: null
      })
    }
  }

  handleSortClick () {
    console.log('start to sort: ', this.state.factors)
  }

  handleClick () {
    const editingKey = this.state.editingKey
    const currFactors = this.state.factors.slice()
    console.log('factor container hit', editingKey, currFactors)

    // if user is editing one of the existing factors
    if (editingKey === '') {
      // user is editing a new factor and click outside
      // so remove the new factor even if he already types something
      for (let i = 0; i < currFactors.length; i++) {
        if (currFactors[i] === '') {
          currFactors.splice(i, 1)
        }
      }
      this.setState({ factors: currFactors, editingKey: null })
    } else if (editingKey !== null) {
      this.setState({ editingKey: null })
    }
  }

  handleClickDelete (key) {
    console.log('click delete', key)
    const newFactors = this.state.factors.slice()
    for (let i = 0; i < newFactors.length; i++) {
      if (newFactors[i] === key) {
        newFactors.splice(i, 1)
      }
    }
    this.setState({ factors: newFactors })
  }

  handleNewFactorInputKeyDown (e) {
    const input = e.target
    const inputVal = e.target.value
    const isEnter = (e.key === 'Enter' || e.keyCode === 13)

    if (isEnter && inputVal !== '') {
      const newFactors = this.state.factors.slice()
      newFactors.push(inputVal)
      this.setState({ factors: unique(newFactors) })
      // TODO: 中文輸入的 enter 不會清空
      input.value = ''
    }
  }

  render () {
    const factors = this.state.factors.map((factor) => {
      return (
                <Factor
                    value={factor}
                    isEditing={this.state.editingKey == factor}
                    key={factor}
                    onClick={() => this.handleFactorClick(factor)}
                    onKeyDown={(e) => this.handleFactorInputKeyDown(e)}
                    onClickDelete = {() => this.handleClickDelete(factor)}
                />
      )
    })

    return (
            <div>
                <div className='table'>
                    <div className='row'>
                        <div className='column row space-evenly'>
                            <span className='header'>人生至今工作過的地方</span>
                        </div>
                        <div className='column row space-evenly'>
                            <span className='header'>在這些地方讓我很崩潰的人</span>
                        </div>
                    </div>
                    <div className='row'>
                        <textarea className='column' rows="20" placeholder="寫下至今工作過的地方，好方便回憶"></textarea>
                        <div className='column'>
                            <div className='factorContainer' onClick={() => this.handleClick()}>{factors}</div>
                            <div className='newFactorInputContainer'>
                                <input
                                    className='newFactorInput'
                                    placeholder='新增因素'
                                    onKeyDown={(e) => this.handleNewFactorInputKeyDown(e)}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row center'>
                    <Link to={
                      '/compare?cate=' + this.props.cate
                      + '&title=' + this.props.title
                      + '&factors=' + this.state.factors}
                    >
                      排序
                    </Link>
                </div>
            </div>
    )
  }
}

function Factor (props) {
  return (
        <div
            className='factor'
            onClick={(e) => { e.stopPropagation(); props.onClick() }}
        >
            <button className='factorDelete' onClick={(e) => { e.stopPropagation(); props.onClickDelete() }}>x</button>
            <div className='factorTextContainer'>
            {
                props.isEditing
                  ? <input className='factorEditInput' defaultValue={props.value} onKeyDown={(e) => props.onKeyDown(e)} autoFocus></input>
                  : props.value
            }
            </div>
        </div>
  )
}

function unique (arr) {
  return [...new Set(arr)]
}

export default OptionTable
