import React from 'react'
import ReactDOM from "react-dom";
import { useState } from 'react'
import Gemini from './mod/mainapi.jsx'
import Signup from './components/Signup.jsx';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//<Route path="/" element={<HelloWorld/>}/>
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Gemini/>}/>
      </Routes>
    </Router>

  )
}

export default App
