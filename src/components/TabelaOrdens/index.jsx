import React, { useState, useEffect } from "react";
import './index.css'

export default function TabelaOrdens() {
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
    <div className="box-table">
      <h2>Lista de Ordens:</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Carro</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(-10).map((item) => (
            <tr key={item.data}>
              <td>{item.nome}</td>
              <td>{item.veiculo}</td>
              <td>{new Date(item.data).getDate()}/  
                  {new Date(item.data).getMonth() + 1}/ 
                  {new Date(item.data).getFullYear()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
