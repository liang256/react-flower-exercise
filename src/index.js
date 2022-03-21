import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './Flower.css';

class Flower extends React.Component {
    render() {
      const purposeContents = []
      const knowledgeContents = []
      const envContents = []
      const colleagueContents = []
      const skillContents = []
      const salaryContents = []
      const placeContents = []

      this.props.data.forEach(content => {
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

      return (
        <div class="flower">
            flower
            <Petal petalPosition="center" contents={purposeContents}/>
            <Petal petalPosition="degree0" contents={knowledgeContents}/>
            <Petal petalPosition="degree60" contents={envContents}/>
            <Petal petalPosition="degree120" contents={colleagueContents}/>
            <Petal petalPosition="degree180" contents={skillContents}/>
            <Petal petalPosition="degree240" contents={salaryContents}/>
            <Petal petalPosition="degree300" contents={placeContents}/>
        </div>
      );
    }
}

class Petal extends React.Component {
  render() {
    const petalPosition = this.props.petalPosition ?? ''
    const petalContents = this.props.contents.map(content => <Content data={content}/>)
    return (
      <div className={'petal ' + petalPosition}>
          {petalContents}
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    return (
      <div class='petalContent'>
        <strong>{this.props.data.title + ':'}</strong>
        {
          this.props.data.sortedFactors.length == 0
          ? <ContentText text={this.props.data.text}/>
          : <FactorsList factors={this.props.data.sortedFactors}/>
        }
      </div>
    );
  }
}

class ContentText extends React.Component {
  render() {
    return (
      <p>{this.props.text}</p>
    );
  }
}

class FactorsList extends React.Component {
  render() {
    const factors = this.props.factors.map(factor => <li>{factor}</li>)
    return (
      <ol>{factors}</ol>
    );
  }
}

const data = [
  {category: 'purpose', title: '我的人生目標或使命', sortedFactors: [], text: '娛樂，做好笑的事。'},
  {category: 'knowledge', title: '我最愛的知識或興趣領域', sortedFactors: ['ACG', '電腦科學', '日本文化', '加密貨幣', '迷因', '甜點', '性'], text: ''},
  {category: 'env', title: '我最愛的工作環境', sortedFactors: ['公司文化自由開放', '冷氣強', '桌椅高級', '附近美食多', '彈性服裝', '採光好'], text: ''},
  {category: 'colleague', title: '我偏好一起工作的人', sortedFactors: ['有團隊精神', '易溝通', '宅', '脾氣好', '北爛'], text: ''},
  {category: 'colleague', title: '我的和倫碼', sortedFactors: [], text: 'AIR'},
  {category: 'skill', title: '我有能力也喜歡做的事', sortedFactors: ['深度思考', '鑽研', '開發優化', '分析', '藝術', '製作'], text: ''},
  {category: 'salary', title: '我想要的責任等級', sortedFactors: [], text: '小組領導人'},
  {category: 'salary', title: '我偏好的薪資範圍', sortedFactors: [], text: '80K ~ 140K'},
  {category: 'salary', title: '其他希望得到的報酬', sortedFactors: [], text: '發揮創意的機會'},
  {category: 'place', title: '我偏好的居住地點', sortedFactors: ['多倫多', '東京', '新加坡', '紐約', '台東'], text: ''},
  {category: 'place', title: '我偏好的地理優點', sortedFactors: ['乾冷', '植物多', '豐富在地文化', '很多運動選擇', '接近大都市', '有好的賣場'], text: ''}
];

ReactDOM.render(
  <React.StrictMode>
    <Flower data={data}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
