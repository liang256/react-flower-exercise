import React, { useState, useRef } from 'react'
import './Flower.css'
import { Link } from 'react-router-dom'
import {getContentUrl} from './PetalUrlConfig'
import initFlowerData from './FlowerData'
import LinkButton from './LinkButton'

function Flower() {

  let flowerData = sessionStorage.getItem('flowerData');
  try {
    flowerData = JSON.parse(flowerData)
  } catch (e) {
    flowerData = initFlowerData()
  }
  const [data, setData] = useState(flowerData)


    const purposeContents = []
    const knowledgeContents = []
    const envContents = []
    const colleagueContents = []
    const skillContents = []
    const salaryContents = []
    const placeContents = []
    if (Array.isArray(data)) {
      data.forEach(content => {
        if (content !== Object(content)) {
          return
        }
        switch (content.category) {
          case 'purpose':
            purposeContents.push(content)
            break
          case 'knowledge':
            knowledgeContents.push(content)
            break
          case 'env':
            envContents.push(content)
            break
          case 'colleague':
            colleagueContents.push(content)
            break
          case 'skill':
            skillContents.push(content)
            break
          case 'salary':
            salaryContents.push(content)
            break
          case 'place':
            placeContents.push(content)
            break
          default:
        }
      })
    }

    // 完成廣場練習後顯示空白的人生哲學單元
    // 點擊可進入完成該單元
    if (purposeContents.length === 1) {
      purposeContents.push({
        category: 'purpose',
        title: '我的人生哲學',
        text: '',
        sortedFactors: []
      })
    }

    const handleInitClick = () => {
      setData(initFlowerData)
    }
 
    return (
      <div>
        
        <div className="flower">
            <Petal 
              name='目標' 
              key='purpose' 
              petalPosition="center" 
              contents={purposeContents}
            />
            <Petal name='領域' key='knowledge' petalPosition="degree0" contents={knowledgeContents}/>
            <Petal name='環境' key='env' petalPosition="degree60" contents={envContents}/>
            <Petal name='同事' petalPosition="degree120" contents={colleagueContents}/>
            <Petal name='能力' key='skill' petalPosition="degree180" contents={skillContents}/>
            <Petal name='薪資' key='salary' petalPosition="degree240" contents={salaryContents}/>
            <Petal name='地點' key='place' petalPosition="degree300" contents={placeContents}/>
        </div>
        <div className='row center buttonContainer'>
          <LinkButton
            to='#'
            text='Reset'
            onClick={handleInitClick}
          />
        </div>
      </div>
    )
  // }
}

function Petal(props) {

  const petalPosition = props.petalPosition ?? ''
  const petalContents = props.contents.map((content, index) => {
    return(
      <Content key={content.title} data={content} index={index}/>
    )
  })
  
  let url
  switch (props.name) {
    case '同事':
      url = '/make-options?cate=colleague&title=我偏好一起工作的人'
      break
    case '環境':
      url = '/make-options?cate=env&title=我最愛的工作環境'
      break
    case '能力':
      url = '/stories'
      break
    case '目標':
      url = '/plazas'
      break
    case '領域':
      url = '/find-knowledges'
      break
    case '薪資':
      url = '/salary'
      break
    case '地點':
      url = '/make-options?cate=place&title=我偏好的地理優點'
      break
    default:
      url = '#'
  }

  let defaultPetalClass = 'petal ' + petalPosition
  defaultPetalClass += (petalContents.length > 0) ? ' filled' : ''
  const petalRef = useRef()

  return (
    <div className={defaultPetalClass} ref={petalRef}>
        {
          petalContents.length > 0 
          ? <div className='contentContainer'>{petalContents}</div>
          : (<div className='petalNameContainer'>
              <Link to={url}>
                <span 
                  className='petalName'
                  onMouseEnter={() => {
                    petalRef.current.classList.add("hover")
                  }}
                  onMouseLeave={() => {
                    petalRef.current.classList.remove("hover")
                  }}
                >
                  {props.name}
                </span>
              </Link>
            </div>)
        }
    </div>
  )

}

function Content(props) {
    
    const isTextMode = (props.data.sortedFactors.length === 0)
    const smallText = (
      props.data.category === 'salary'
      || (isTextMode && props.data.text.length > 50)
      || (!isTextMode && props.data.sortedFactors.length >= 10)
    ) ? true : false
    return (
      <div className={props.index === 0 ? 'petalContent first' : 'petalContent'}>
        <Link to={getContentUrl(props.data.category, props.data.title)}>
          <span className='contentTitle'>{props.data.title}</span>
        {
            isTextMode
              ? <p className={smallText ?'contentText smallText' : 'contentText'}>{props.data.text}</p>
              : <FactorsList factors={props.data.sortedFactors} cate={props.data.category} smallText={smallText}/>
        }
        </Link>
      </div>
    )
}

function FactorsList(props) {
    const smallText = (props.smallText === undefined) ? false : props.smallText
    const factors = props.factors.map(factor => {
      return(
        <li 
          key={factor}
          className={smallText ? 'smallText' : ''}
        >
          {factor}
        </li>
      )
    })
    return (
      <ol className='factorList'>{factors}</ol>
    )

}

export default Flower
