import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css'
import iconPDF from '../../views/pdf-icon.png'
import iconEditar from '../../views/editar-icon.png'
import generatePDF from './pdfGenerator';

export default function TabelaOrdens(props) {
  const navigate = useNavigate()

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setData(props.propDB);
    };
    getData();
  }, [props.propDB]);

  const handleGeneratePDF = (order) => {
    generatePDF(order);
  };

  const handleNavigate = (item) => {
    navigate('/editar', { state: { item } });
  };
  
  return (
    <div className="box-table">
      <h2>Lista de Ordens:</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Carro</th>
            <th>Placa</th>
            <th>Data</th>
            <th>PDF</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(-4).map((item, i) => (
            <tr key={item.data}>
              <td>{item.nome}</td>
              <td>{item.veiculo}</td>
              <td>{item.placa}</td>
              <td>{new Date(item.data).getDate()}/  
                  {new Date(item.data).getMonth() + 1}/ 
                  {new Date(item.data).getFullYear()}
              </td>
              <td><button className="button-pdf" onClick={() => handleGeneratePDF(item)}><img className="image-icon" src={iconPDF} alt="Ícone de PDF" /></button></td>
              <td><button className="button-pdf" onClick={() => handleNavigate(item)}><img className="image-icon" src={iconEditar} alt="Ícone de Editar" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
