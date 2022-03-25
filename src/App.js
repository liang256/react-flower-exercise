import React from 'react'
import './App.css'
import { Outlet, Link } from 'react-router-dom'

function App () {
  return (
    <div>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem'
          }}
        >
          <Link to="/">Home</Link> |{' '}
          <Link to="/invoices">Invoices</Link> |{' '}
          <Link to="/expenses">Expenses</Link>
        </nav>
        <Outlet/>
    </div>
  )
}

export default App
