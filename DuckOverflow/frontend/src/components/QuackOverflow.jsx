import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/QuackOverflow.css';
import duckImage from '../assets/duckHero.png';
import quackSound from '../assets/quack.mp3';
// import App from './App.jsx';

export default function QuackOverflow()
{
  const duckSoundClick= () => {const audio = new Audio(quackSound);
  audio.play();
  audio.addEventListener('ended', () => {window.location.href = "/Signup"}); 
  };

  return (
    <main className="Quack">
        <div className='image'> 
            <h1 className ="greeting">Welcome to DuckOverflow!</h1>
        </div>
        <button onClick={duckSoundClick}>Quack!</button>
    </main>
  );
}



const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <QuackOverflow />
  </StrictMode>,
);
