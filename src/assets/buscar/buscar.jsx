import React, { useState } from 'react';
import TabelaOrdens from '../../components/TabelaOrdens';

export default function SearchComponent(props) {
  const dadosDoDB = props.propDB;
  const [nome, setNome] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [resultados, setResultados] = useState([]);

  console.log(dadosDoDB)

  const handleSearch = () => {
    const resultadosFiltrados = dadosDoDB.filter(objeto => {
      // Filtra com base nos critérios de busca (nome, veículo, mês e ano da data)
      return (
        (nome === '' || objeto.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (veiculo === '' || objeto.veiculo.toLowerCase().includes(veiculo.toLowerCase())) &&
        (mes === '' || new Date(objeto.data).getMonth() + 1 === parseInt(mes)) &&
        (ano === '' || new Date(objeto.data).getFullYear() === parseInt(ano))
      );
    });
    setResultados(resultadosFiltrados);
  };

  return (
    <div className='content'>
      <h2>Buscar Ordens</h2>
      <div>
        <label htmlFor='nome'>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label htmlFor='veiculo'>Veículo:</label>
        <input type="text" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} />
      </div>
      <div>
        <label htmlFor='mes'>Mês:</label>
        <input type="text" value={mes} onChange={(e) => setMes(e.target.value)} />
      </div>
      <div>
        <label htmlFor='ano'>Ano:</label>
        <input type="text" value={ano} onChange={(e) => setAno(e.target.value)} />
      </div>
      <button onClick={handleSearch} className='btn btn-pesquisar'>Buscar</button>
      <TabelaOrdens propDB={resultados}/>
    </div>
  );
}
