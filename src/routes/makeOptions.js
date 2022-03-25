import React from 'react'
import { useSearchParams } from 'react-router-dom'
import OptionTable from '../OptionTable'

function MakeOptions() {
  let [searchParams, setSearchParams] = useSearchParams()
  const cate = searchParams.get('cate')
  const title = searchParams.get('title')
  return (
    <div>
      <OptionTable cate={cate} title={title}/>
    </div>
  )
}

export default MakeOptions
