import React from 'react'
import {Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div>
      <div className="errorSection">
      <Link to='/' style={{color:"darkblue",fontSize:"1.5rem"}}>
      <p>go back</p>
      </Link>
        <h1>404</h1><br/>
        <div>Page Not found</div>
      </div>
    </div>
    </>
  )
}

export default NotFound
