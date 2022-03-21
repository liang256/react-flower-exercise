import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './Flower.css';

class Flower extends React.Component {
    render() {
      return (
        <div class="flower">
            flower
            <Petal petalPosition="center"/>
            <Petal petalPosition="degree0"/>
            <Petal petalPosition="degree60"/>
            <Petal petalPosition="degree120"/>
            <Petal petalPosition="degree180"/>
            <Petal petalPosition="degree240"/>
            <Petal petalPosition="degree300"/>
        </div>
      );
    }
}

class Petal extends React.Component {
  render() {
    const petalPosition = this.props.petalPosition ?? ''
    return (
      <div className={'petal ' + petalPosition}>
          petal
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Flower />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
