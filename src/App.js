import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './assets/home/home';
import Cadastrar from './assets/cadastrar/cadastrar'; // Supondo que você tenha um componente Cadastrar

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
      </Routes>
    </Router>
  );
}

export default App;

