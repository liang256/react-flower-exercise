import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import PurposePage from './PurposePage';
import ColleagueFactors from './ColleagueFactors';
import Compare from './Compare';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
        <Switch>
            <Route path='/' exact>
                <HomePage/>
            </Route>
            <Route path='/purpose'>
                <PurposePage/>
            </Route>
            <Route path='/colleagueFactors'>
              <ColleagueFactors/>
            </Route>
            <Route path='/compare'>
              <Compare/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
