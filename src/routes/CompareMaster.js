import React from 'react'
import {
    useSearchParams,
  } from "react-router-dom";
import Compare from '../Compare';

function CompareMaster() {
    let [searchParams, setSearchParams] = useSearchParams();
    const cate = searchParams.get('cate')
    const title = searchParams.get('title')
    let factors = searchParams.get('factors')
    if (factors == null) {
        factors = []
    } else {
        factors = factors.split(',')
    }
    factors = factors.filter(factor => factor !== '')
    console.log(factors)
  return (
    <div>
      <Compare factors={factors} cate={cate} title={title}/>
    </div>
  )
}

export default CompareMaster
