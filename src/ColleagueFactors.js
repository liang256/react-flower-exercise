import React from 'react'
import { Link } from 'react-router-dom';
import './Colleague.css'

function ColleagueFactors() {

  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>人生至今工作過的地方</th>
            <th>在這些地方讓我很崩潰的人</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><textarea rows="20" placeholder="寫下至今工作過的地方，好方便回憶"></textarea></td>
            <td><FactorContainer/></td>
          </tr>
        </tbody>
      </table>
      
    </div>
  )
}

class FactorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      factors: ['懶散', '反應慢']
    };
    this.appendNewFactor = this.appendNewFactor.bind(this);
  }

  appendNewFactor(factor){
    const factors = this.state.factors
    factors.push(factor)
    this.setState({factors: factors})
  }

  render() {
    const factors = this.state.factors.map((factor) => <FactorItem text={factor} key={factor}/>)
    return (
      <div>
        <div>
          <div className='factorContainer'>
            {factors}
          </div>
          <FactorCreator onNewFactorGiven={this.appendNewFactor}/>
        </div>
        <div className='buttonContainer'>
          <Link to='/compare'>排序</Link>
        </div>
      </div>
    );
  }
}

class FactorCreator extends React.Component {
  constructor(props) {
    super(props);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const value = e.target.value
        document.getElementById("factorInput").value = "";
        this.props.onNewFactorGiven(value)
      }
    }
  }

  render() {
    return (
      <input id="factorInput" placeholder='type annoying factor' onKeyDown={this.handleKeyDown}></input>
    )
  }
}

class FactorItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text, // 可能不是寫在這，而是透過更新 factorContainer 來更新這
      isInputShow: false
    }
    this.toggleInputShow = this.toggleInputShow.bind(this)
    this.showInput = this.showInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.hideInput = this.handleKeyDown.bind(this)
  }

  toggleInputShow() {
    console.log('toggle hit')
    if (! this.state.isInputShow) {
      this.setState({isInputShow: true})
    } else {
      this.setState({isInputShow: false})
    }
  }

  showInput() {
    if (! this.state.isInputShow) {
      this.setState({isInputShow: true})
    }
  }

  hideInput() {
    if (this.state.isInputShow) {
      this.setState({isInputShow: false})
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        console.log('try to update factor')
        const value = e.target.value
        // document.getElementById("factorInput").value = "";
        this.setState({text: value})
        this.hideInput()
      }
    }
  }

  render() {
    return (
      <div className='factor' onClick={this.showInput} onKeyDown={this.handleKeyDown}>
        {! this.state.isInputShow && <span>{this.state.text}</span>}
        <input type={this.state.isInputShow ? 'text' : 'hidden'}></input>
      </div>
    );
  }
}

export default ColleagueFactors
