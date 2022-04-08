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

    // 最愛的能力比較完後不需要轉寫成相反因素
    const selectPositive = (cate === 'skill' && title === '我最愛的能力')
      ? true
      : false

    if (factors == null) {
        factors = []
    } else {
        factors = factors.split(',')
    }
    factors = factors.filter(factor => factor !== '')

  return (
    <div>
      <Compare factors={factors} cate={cate} title={title} selectPositive={selectPositive}/>
    </div>
  )
}

export default CompareMaster
