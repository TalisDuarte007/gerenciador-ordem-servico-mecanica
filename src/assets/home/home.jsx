import React from "react";
import { useNavigate } from 'react-router-dom';
import TabelaOrdens from "../../components/TabelaOrdens/index";
import './home.css'

function Home() {
  const navigate = useNavigate()


  return (
    <div className="content">
      <h1>Sistema de Ordens de Serviço</h1>
      <div className="buttons">
        <button onClick={() => navigate('/cadastrar')} className="btn btn-salvar">Cadastrar Nova Ordem</button>
        {/* <button onClick={abrirModal} className="btn btn-salvar">Cadastrar Nova Ordem</button> */}
        <button className="btn btn-salvar">Buscar Ordem</button>
      </div>
      <TabelaOrdens />
    </div>
  );
}

export default Home;
