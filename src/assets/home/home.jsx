import React from "react";
import { useNavigate } from 'react-router-dom';
import TabelaOrdens from "../../components/TabelaOrdens/index";
import './home.css'

export default function Home(props) {
  const navigate = useNavigate()

  return (
    <div className="content">
      <h1>Sistema de Ordens de Serviço</h1>
      <div className="buttons">
        <button onClick={() => navigate('/cadastrar') } className="btn btn-salvar">Cadastrar Ordem</button>
        <button onClick={() => navigate('/buscar') } className="btn btn-salvar">Buscar Ordem</button>
      </div>
      <TabelaOrdens propDB={props.propDB}/>
    </div>
  );
}