import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/QuackOverflow.css';
import duckImage from '../assets/duck.png';
// import App from './App.jsx';

export default function QuackOverflow()
{
  return (
    <main className="Quack">
        <div className='image'> 
            <h1 className ="greeting">Welcome to QuackOverflow!</h1>
        </div>
    </main>
  );
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <QuackOverflow />
  </StrictMode>,
);
