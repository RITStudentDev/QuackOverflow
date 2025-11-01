import React from 'react'
import ReactDOM from "react-dom";
import { useState } from 'react'
import Gemini from './mod/mainapi.jsx'
import Signup from './components/Signup.jsx'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Gemini/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>

  )
}

export default App
