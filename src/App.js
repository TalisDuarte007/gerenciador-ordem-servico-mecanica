import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import Home from './assets/home/home';
import Cadastrar from './assets/cadastrar/cadastrar';
import Buscar from './assets/buscar/buscar';

export default function App() {
  const [data, setData] = useState([]);
  const endPoint = "https://sheetdb.io/api/v1/9ned902qlo87s";

  const getData = async () => {
    try {
      const res = await fetch(endPoint);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home propDB={data}/>}  />
        <Route path='/cadastrar' element={<Cadastrar propEndPoint={endPoint}/>} />
        <Route path='/buscar' element={<Buscar propDB={data}/>} />
      </Routes>
    </Router>
  );
}

