import React, { useState } from 'react'
import './Flower.css'
import { Link } from 'react-router-dom'
import {getContentUrl} from './PetalUrlConfig'
import initFlowerData from './FlowerData'

function Flower() {

  let flowerData = sessionStorage.getItem('flowerData');
  try {
    flowerData = JSON.parse(flowerData)
  } catch (e) {
    flowerData = initFlowerData()
  }
  const [data, setData] = useState(flowerData)

  // render () {
    const purposeContents = []
    const knowledgeContents = []
    const envContents = []
    const colleagueContents = []
    const skillContents = []
    const salaryContents = []
    const placeContents = []

    data.forEach(content => {
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
      }
    })

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
        <div className='container'>
          <button
            onClick={handleInitClick}
          >
            Reset
          </button>
        </div>
      </div>
    )
  // }
}

function Petal(props) {

  const petalPosition = props.petalPosition ?? ''
  const petalContents = props.contents.map(content => {
    return(
      <Content key={content.title} data={content}/>
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
      url = '/make-options?cate=colleague&title=我偏好一起工作的人'
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

  const [petalClassName, setPetalClassName] = useState('petal ' + petalPosition)

  return (
    <div className={petalClassName}>
        {
          petalContents.length > 0 
          ? petalContents 
          : (<div className='petalNameContainer'>
              <Link to={url}>
                <span 
                  className='petalName'
                  onMouseEnter={() => {
                    setPetalClassName('petal ' + petalPosition + ' hover')
                  }}
                  onMouseLeave={() => {
                    setPetalClassName('petal ' + petalPosition)
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

class Content extends React.Component {
  render () {
    return (
      <div className='petalContent'>
        <Link to={getContentUrl(this.props.data.category,this.props.data.title)}>
        <strong>{this.props.data.title + ':'}</strong>
        {
          this.props.data.sortedFactors.length == 0
            ? <ContentText text={this.props.data.text}/>
            : <FactorsList factors={this.props.data.sortedFactors}/>
        }
        </Link>
      </div>
    )
  }
}

class ContentText extends React.Component {
  render () {
    return (
      <p>{this.props.text}</p>
    )
  }
}

class FactorsList extends React.Component {
  render () {
    const factors = this.props.factors.map(factor => <li key={factor}>{factor}</li>)
    return (
      <ol>{factors}</ol>
    )
  }
}

export default Flower
