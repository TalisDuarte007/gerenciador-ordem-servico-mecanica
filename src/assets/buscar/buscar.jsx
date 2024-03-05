import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabelaOrdens from "../../components/TabelaOrdens";

export default function SearchComponent(props) {
  const navigate = useNavigate();
  const dadosDoDB = props.propDB;
  const [nome, setNome] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [resultados, setResultados] = useState([]);

  console.log(dadosDoDB);

  const handleSearch = () => {
    const resultadosFiltrados = dadosDoDB.filter((objeto) => {
      // Filtra com base nos critérios de busca (nome, veículo, mês e ano da data)
      return (
        (nome === "" ||
          objeto.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (veiculo === "" ||
          objeto.veiculo.toLowerCase().includes(veiculo.toLowerCase())) &&
        (mes === "" ||
          new Date(objeto.data).getMonth() + 1 === parseInt(mes)) &&
        (ano === "" || new Date(objeto.data).getFullYear() === parseInt(ano))
      );
    });
    setResultados(resultadosFiltrados);
  };
  console.log(resultados);

  return (
    <div className="content">
      <h2>Buscar Ordens</h2>
      <div className="label-box">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input-box"
        />
      </div>
      <div className="label-box">
        <label htmlFor="veiculo">Veículo:</label>
        <input
          type="text"
          value={veiculo}
          onChange={(e) => setVeiculo(e.target.value)}
          className="input-box"
        />
      </div>
      <div className="label-box">
        <label htmlFor="mes">Mês:</label>
        <input
          type="text"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="input-box"
        />
      </div>
      <div className="label-box">
        <label htmlFor="ano">Ano:</label>
        <input
          type="text"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className="input-box"
        />
      </div>
      <div className="buttons">
        <button onClick={handleSearch} className="btn btn-pesquisar">
          Buscar
        </button>
        <button onClick={() => navigate("/")} className="btn btn-pesquisar">
          Cancelar
        </button>
      </div>

      <TabelaOrdens propDB={resultados} />
    </div>
  );
}
