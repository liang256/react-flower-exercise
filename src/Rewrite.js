import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {updateRow} from './FlowerData';
import './OptionTable.css'
import './Rewrite.css'
import LinkButton from './LinkButton'

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

    const factorRows = factors.map((f, index) => {
        return (
            <div className='rewriteRow' key={index}>
                <span>{(index + 1) + '. ' + f}</span>
                <input 
                    type='text'
                    defaultValue={f}
                    onChange={(e) => {
                        let newOppsiteFactors = oppsiteFactors.slice()
                        newOppsiteFactors[index] = e.target.value
                        setOppsiteFactors(newOppsiteFactors)
                    }}
                ></input>
            </div>
        )
    })

    const save = () => {
        updateRow(cate, title, oppsiteFactors)
    }

    return (
        <div className='rewriteContainer'>
            <p>將負面因素轉寫成正面因素</p>
            {factorRows}
            <div className='row center buttonContainer'>
                <LinkButton
                 to='/'
                 onClick={save}
                 text='Save'
                />
            </div>
        </div>
    )
}

export default Rewrite
