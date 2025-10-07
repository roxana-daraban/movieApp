import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card=({title})=>{
  return(
    <div>
    <h2>{title}</h2>
    </div>

  )
}

const App=()=>{  
  return (
  <div className="card-container">
    <h2>Functional Arrow Component</h2>

    <Card title="Star Wars" rating={5} isCool={true} />
    <Card title="The lion king"/>
    <Card title="Avatar" />
   
  </div>
  )
}

export default App
