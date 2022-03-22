import React from 'react'
import './Flower.css'
import { Link } from 'react-router-dom'

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
        <Link to='#'>redo</Link>
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

export default Flower
