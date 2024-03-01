import React, { useState, useEffect } from "react";
import './index.css'
import icon from '../../views/pdf-icon.png'

export default function TabelaOrdens(props) {
  const [data, setData] = useState([]);

  const getData = async () => {
    setData(props.propDB)
  } 

  useEffect(() => {
    getData();
  });

  return (
    <div className="box-table">
      <h2>Lista de Ordens:</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Carro</th>
            <th>Data</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(-10).map((item) => (
            <tr key={item.data}>
              <td>{item.nome}</td>
              <td>{item.veiculo}</td>
              <td>{new Date(item.data).getDate()}/  
                  {new Date(item.data).getMonth() + 1}/ 
                  {new Date(item.data).getFullYear()}
              </td>
              <td><button className="button-pdf"><img className="image-icon" src={icon} alt="Ícone de PDF" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
