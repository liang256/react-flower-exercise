import React from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'

function App () {
  return (
    <div>
        {/* <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem'
          }}
        >
          <Link to="/">Home</Link> |{' '}
          <Link to="/stories">Stories</Link>
        </nav> */}
        <div className='container headerContainer'>
          <Link to='/'>
            <span>Flower Excercise</span>
          </Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default App
