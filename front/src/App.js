import './App.css';
import TransferToken from './components/TransferToken';
import Latch from './components/Latch';
import Unpair from './components/Unpair';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';

function App() {

  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<TransferToken />}/>           
          <Route path="/latch" element={<Latch />}/>
         <Route path="/unpair" element={<Unpair />}/>
        </Routes>
    </div>
  );
}

export default App;
