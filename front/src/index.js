import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TransferToken from './components/TransferToken';
import Latch from './components/Latch';
import Unpair from './components/Unpair';

let latchPair = false;

export function setLatchPaired(bool) {
  latchPair = bool;
}

export function getLatchPaired() {
  return latchPair;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransferToken />}/>
        <Route path="/latch" element={<Latch />}/>
        <Route path="/unpair" element={<Unpair />}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
