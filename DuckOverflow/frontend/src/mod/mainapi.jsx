import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./mapi.css";
import quackSound from '../assets/quack.mp3';
import { create_post } from '../mod/endpoints.js';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";

if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
  console.error(
    "Error: Gemini API key not found. Please set VITE_GEMINI_API_KEY environment variable or replace 'YOUR_GEMINI_API_KEY' with your actual key."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function callGemini(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const result = await model.generateContent(question);
  const text = await result.response.text();
  return text;
}

const ParticleB = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const numParticles = 50;
    const newParticles = Array.from({ length: numParticles }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particler">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            '--bottom-pos': `${particle.bottom}vh`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Gemini() {
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const input = (event) => setInputValue(event.target.value);
  const input2 = (event) => setInputValue2(event.target.value);

  const submit = async () => {
    const audio = new Audio(quackSound);
    audio.play();

    audio.addEventListener('ended', async () => {
      try {
        const result = await callGemini(inputValue + "\n" + inputValue2);
        setResponse(result);

        if (!result || result.trim() === "") {
          console.error("Post not created.");
          return;
        }

        const title = inputValue || "Untitled Question";
        console.log("Gemini Result:", result);

        // Call create_post without manually passing a token (cookies handle auth)
        const postResult = await create_post(title, inputValue2, result);
        console.log("Post created:", postResult);

      } catch (error) {
        console.error("Error during AI call", error);
      }
    });
  };

  return (
    <main>
      <ParticleB numParticles={125} />
      <div className="main">
        <section className="container">
          <h1>DuckOverflow</h1>

          <input
            id="question-input"
            name="question"
            style={{
              backgroundColor: 'lightgray',
              padding: '10px 20px',
              borderRadius: '5px',
              border: '1px solid gray',
            }}
            type="text"
            placeholder="Enter a question..."
            value={inputValue}
            onChange={input}
            autoComplete="off"
          />

          <input
            id="code-input"
            name="code"
            style={{
              backgroundColor: 'lightgray',
              padding: '10px 20px',
              borderRadius: '5px',
              border: '1px solid gray',
            }}
            type="text"
            placeholder="Enter the code..."
            value={inputValue2}
            onChange={input2}
            autoComplete="off"
          />

          <button onClick={submit}>Submit</button>
          <button onClick={() => navigate("/questions")}>Posted Questions</button>
        </section>

        <div className="response">{response}</div>
      </div>
    </main>
  );
}
