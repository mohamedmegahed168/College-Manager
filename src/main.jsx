import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HandleSignUP from './signUp.jsx';
import HandleSignIn from './signIn.jsx';
import HandleHome from './home.jsx';
import './index.css';
import App from './App.jsx';

const rootReference = document.getElementById('root');
const myRoot = createRoot(rootReference);
myRoot.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signUp" element={<HandleSignUP />} />
      <Route path="/signIn" element={<HandleSignIn />} />
      <Route path="/home" element={<HandleHome />} />
    </Routes>
  </BrowserRouter>
);
