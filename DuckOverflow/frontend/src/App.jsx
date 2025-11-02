import React from 'react'
import ReactDOM from "react-dom";
import { useState } from 'react'
import Gemini from './mod/mainapi.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx';
import QuackOverflow from './components/QuackOverflow.jsx';
import Questions from './components/Questions.jsx';
import PostDetails from './components/PostDetails.jsx';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//<Route path="/" element={<HelloWorld/>}/>
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<QuackOverflow/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/questions" element={<Questions/>}/>
        <Route path="post/:id" element={<PostDetails/>}/>
        <Route path="/mainapi" element={<Gemini/>}/>
      </Routes>
    </Router>

  )
}

export default App
