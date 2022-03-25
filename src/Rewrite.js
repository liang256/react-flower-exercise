import React, { useState } from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import updateRow from './FlowerData';
import './OptionTable.css'

function Rewrite() {
    let [searchParams, setSearchParams] = useSearchParams();
    let factors = searchParams.get('factors')
    let cate = searchParams.get('cate')
    let title = searchParams.get('title')
    if (factors == null) {
        factors = []
    } else {
        factors = factors.split(',')
    }
    factors = factors.filter(factor => factor !== '')
    const [oppsiteFactors, setOppsiteFactors] = useState(factors)

    const factorList = factors.map(factor => {
        return (
            <li key={factor}>{factor}</li>
        )
    })
    const oppsiteFactorList = factors.map((factor, index) => {
        return (
            <li key={'oppsite-' + factor}>
                <input defaultValue={factor} onChange={(e) => {
                    let newOppsiteFactors = oppsiteFactors.slice()
                    newOppsiteFactors[index] = e.target.value
                    setOppsiteFactors(newOppsiteFactors)
                }}></input>
            </li>
        )
    })

    return (
        <div>
            <div className='row'>
                <div className='column'>
                    <ol>{factorList}</ol>
                </div>
                <div className='column'>
                    <ol>{oppsiteFactorList}</ol>
                </div>
            </div>
            <div className='row center'>
                <Link to='/' onClick={() => updateRow(cate, title, oppsiteFactors)}>submit</Link>
            </div>
        </div>
    )
}

export default Rewrite
