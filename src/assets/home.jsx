import React, { useState } from "react";
import CadastroOrdemModal from "../components/CadastrarOrdemModal/index";
import TabelaOrdens from "../components/TabelaOrdens/index";
import './home.css'

function Home() {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <div className="content">
      <h1>Sistema de Ordens de Serviço</h1>
      <div className="buttons">
        <button onClick={abrirModal} className="btn btn-salvar">Cadastrar Nova Ordem</button>
        <button className="btn btn-salvar">Buscar Ordem</button>
      </div>
      <TabelaOrdens />
      <CadastroOrdemModal isOpen={modalAberto} onClose={fecharModal} />
    </div>
  );
}

export default Home;
