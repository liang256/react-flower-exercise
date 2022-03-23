import React from 'react'
import './OptionTable.css'

class OptionTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            factors: ['懶散', 'h'],
            editingKey: null
        }
    } 
    handleFactorClick(key) {
        // console.log('factor click', key)
        this.setState({
            editingKey: key
        })
    }
    handleFactorInputKeyDown(e) {
        if (e.key === 'Enter') {
            if (e.target.value == '') {

            }
            // update target factor
            const key = e.target.defaultValue
            const newValue = e.target.value
            const newFactors = this.state.factors.slice()
            for (var i = 0; i < newFactors.length; i++) {
                if (newFactors[i] == key) {
                    if (newValue == '') {
                        // remove the factor
                        newFactors.splice(i, 1)
                    } else {
                        newFactors[i] = newValue
                    }
                }
            }
            this.setState({
                factors: newFactors,
                editingKey: null
            })
        }
    }
    handleSortClick() {
        console.log('start to sort: ', this.state.factors)
    }
    render() {
        const factors = this.state.factors.map((factor) => {
            return (
                <Factor 
                    value={factor}
                    isEditing={this.state.editingKey == factor ? true : false}
                    key={factor}
                    onClick={() => this.handleFactorClick(factor)}
                    onKeyDown={(e) => this.handleFactorInputKeyDown(e)}
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
                        <div className='column'>{factors}</div>
                    </div>
                </div>
                <div className='row space-evenly'>
                    <button onClick={ () => this.handleSortClick() }>排序</button>
                </div>
            </div>
        )
    }
}

function Factor(props) {
    return (
        <div 
            className='factor' 
            onClick={props.onClick}
        >
            {
                props.isEditing 
                ? <input defaultValue={props.value} onKeyDown={(e)=>props.onKeyDown(e)} autoFocus></input>
                : props.value
            }
        </div>
    )
}

export default OptionTable
