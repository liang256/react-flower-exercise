import React from 'react'
import './Flower.css'
import { Link } from 'react-router-dom'

class Flower extends React.Component {
  constructor(props) {
    // [
    //   { category: 'purpose', title: '我的人生目標或使命', sortedFactors: [], text: '娛樂，做好笑的事。' },
    //   { category: 'knowledge', title: '我最愛的知識或興趣領域', sortedFactors: ['ACG', '電腦科學', '日本文化', '加密貨幣', '迷因', '甜點', '性'], text: '' },
    //   { category: 'env', title: '我最愛的工作環境', sortedFactors: ['公司文化自由開放', '冷氣強', '桌椅高級', '附近美食多', '彈性服裝', '採光好'], text: '' },
    //   { category: 'colleague', title: '我偏好一起工作的人', sortedFactors: ['有團隊精神', '易溝通', '宅', '脾氣好', '北爛'], text: '' },
    //   { category: 'colleague', title: '我的和倫碼', sortedFactors: [], text: 'AIR' },
    //   { category: 'skill', title: '我有能力也喜歡做的事', sortedFactors: ['深度思考', '鑽研', '開發優化', '分析', '藝術', '製作'], text: '' },
    //   { category: 'salary', title: '我想要的責任等級', sortedFactors: [], text: '小組領導人' },
    //   { category: 'salary', title: '我偏好的薪資範圍', sortedFactors: [], text: '80K ~ 140K' },
    //   { category: 'salary', title: '其他希望得到的報酬', sortedFactors: [], text: '發揮創意的機會' },
    //   { category: 'place', title: '我偏好的居住地點', sortedFactors: ['多倫多', '東京', '新加坡', '紐約', '台東'], text: '' },
    //   { category: 'place', title: '我偏好的地理優點', sortedFactors: ['乾冷', '植物多', '豐富在地文化', '很多運動選擇', '接近大都市', '有好的賣場'], text: '' }
    // ]
    super(props)
    const data = JSON.parse(sessionStorage.getItem('flowerData'));
    // console.log(data)
    this.state = {
      data: Array.isArray(data) ? data : []
    }
  }

  render () {
    const purposeContents = []
    const knowledgeContents = []
    const envContents = []
    const colleagueContents = []
    const skillContents = []
    const salaryContents = []
    const placeContents = []

    this.state.data.forEach(content => {
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
    console.log(colleagueContents)
    return (

        <div className="flower">
            flower
            <Petal key='purpose' petalPosition="center" contents={purposeContents}/>
            <Petal key='knowledge' petalPosition="degree0" contents={knowledgeContents}/>
            <Link to="/make-options?cate=env&title=我最愛的工作環境">
              <Petal key='env' petalPosition="degree60" contents={envContents}/>
            </Link>
            <Link to="/make-options?cate=colleague&title=我偏好一起工作的人">
              <Petal petalPosition="degree120" contents={colleagueContents}/>
            </Link>
            <Link to="/stories">
              <Petal key='skill' petalPosition="degree180" contents={skillContents}/>
            </Link>
            <Link to='/salary'> 
              <Petal key='salary' petalPosition="degree240" contents={salaryContents}/>
            </Link>
            <Link to="/make-options?cate=place&title=我偏好的地理優點">
              <Petal key='place' petalPosition="degree300" contents={placeContents}/>
            </Link>
        </div>
    )
  }
}

class Petal extends React.Component {
  render () {
    const petalPosition = this.props.petalPosition ?? ''
    const petalContents = this.props.contents.map(content => <Content key={content.title} data={content}/>)
    return (
      <div className={'petal ' + petalPosition}>
          {petalContents}
      </div>
    )
  }
}

class Content extends React.Component {
  render () {
    return (
      <div className='petalContent'>
        <strong>{this.props.data.title + ':'}</strong>
        {
          this.props.data.sortedFactors.length == 0
            ? <ContentText text={this.props.data.text}/>
            : <FactorsList factors={this.props.data.sortedFactors}/>
        }
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
