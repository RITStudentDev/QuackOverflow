import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/helloworld.css';
// import App from './App.jsx';

export default function HelloWorld()
{
  return <h1 className ="greeting">Hello, world!</h1>;
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HelloWorld />
  </StrictMode>,
);
