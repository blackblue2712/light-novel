import React from 'react';
import './App.css';

import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainRouter></MainRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
