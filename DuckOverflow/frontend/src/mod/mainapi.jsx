import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./mapi.css";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
  console.error("Error: Gemini API key not found. Please set VITE_GEMINI_API_KEY environment variable or replace 'YOUR_GEMINI_API_KEY' with your actual key.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function callGemini(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const result = await model.generateContent(question);
  return result.response.text;
}

export default function Gemini() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const input = (event) => {
    setInputValue(event.target.value);
  };

  const submit = async () => {
    const result = await callGemini(inputValue);
    setResponse(result);
  };

  return (
    <div className="main">
      <h1>DuckOverflow - Gemini AI</h1>
      <input value={inputValue} onChange={input} />
      <button onClick={submit}>Submit</button>
      <div>{response}</div>
    </div>
  );
}

