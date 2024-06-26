import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import Home from './assets/home/home';
import Cadastrar from './assets/cadastrar/cadastrar';
import Buscar from './assets/buscar/buscar';
import EditarOrdem from './assets/editar/editar';

export default function App() {
  const [data, setData] = useState([]);
  const endPoint = "https://sheetdb.io/api/v1/9ned902qlo87s";

  const getData = async () => {
    try {
      const endpointWithFormat = `${endPoint}?_format=index`;
      const res = await fetch(endpointWithFormat);
      const data = await res.json();
      setData(Object.keys(data).map((key) => data[key]));
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
        <Route path='/editar' element={<EditarOrdem propEndPoint={endPoint}/>} />
      </Routes>
    </Router>
  );
}

