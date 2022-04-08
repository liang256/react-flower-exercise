import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import MakeOptions from './routes/makeOptions'
import Flower from './Flower'
import CompareMaster from './routes/CompareMaster'
import Rewrite from './Rewrite'
import Stories from './routes/stories'
import Story from './routes/Story'
import Analysis from './routes/Analysis'
import Salary from './routes/Salary'
import Plazas from './routes/Plazas'
import Faith from './routes/Faith'
import Knowledges from './routes/Knowledges'
import FindKnowledges from './routes/FindKnowledges'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<Flower />}
          />
          <Route path='faith' element={<Faith/>}/>
          <Route path='knowledges' element={<Knowledges/>}/>
          <Route path='find-knowledges' element={<FindKnowledges/>}/>
          <Route path="make-options" element={<MakeOptions />} />
          <Route path='stories' element={<Outlet/>} >
            <Route index element={<Stories/>}/>
            <Route path=":storyId" element={<Outlet/>}>
              <Route index element={<Story/>} />
              <Route path='analysis' element={<Analysis />}/>
            </Route>
          </Route>
          <Route path="compare" element={<CompareMaster />} />
          <Route path='rewrite' element={<Rewrite />} />
          <Route path='salary' element={<Salary />}/>
          <Route path='plazas' element={<Plazas/>}/>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
