import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/home/home.css"
import "./cadastrar.css";

function CadastrarOrdem(props) {
  const navigate = useNavigate();
  const endPoint = props.propEndPoint;
  const [servicos, setServicos] = useState([{ descricao: "", preco: "" }]);

  const [data, setData] = useState({
    nome: "",
    veiculo: "",
    placa: "",
    data: new Date().toString(),
    lista_servicos: servicos,
  });

  const adicionarServico = () => {
    const novaListaServicos = [...servicos];
    novaListaServicos.push({ descricao: "", preco: "" });
    setServicos(novaListaServicos);
    setData((prevData) => ({ ...prevData, lista_servicos: novaListaServicos }));
  };

  const handleChangeServico = (index, field, value) => {
    const novaListaServicos = [...servicos];
    novaListaServicos[index][field] = value;
    setServicos(novaListaServicos);
    setData((prevData) => ({ ...prevData, lista_servicos: novaListaServicos }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([data]),
      });
      if (res.ok) {
        window.location.reload();
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <h2>Cadastrar Nova Ordem</h2>
      <form>
        <div className="label-box">
          <label htmlFor="nome">
            <span>Cliente:</span>
          </label>
          <input
            name="nome"
            type="text"
            value={data.nome}
            onChange={handleChange}
            className="input-box"
          />
        </div>
        <div className="label-box">
          <label htmlFor="veiculo">
            <span>Veículo:</span>
          </label>
          <input
            name="veiculo"
            type="text"
            value={data.veiculo}
            onChange={handleChange}
            className="input-box"
          />
        </div>
        <div className="label-box">
          <label htmlFor="placa">
            <span>Placa:</span>
          </label>
          <input
            name="placa"
            type="text"
            value={data.placa}
            onChange={handleChange}
            className="input-box"
          />
        </div>
      </form>
      <div>
        <h3>Serviços Realizados:</h3>
        {servicos.map((servico, index) => (
          <div key={`servico`}>
            <form className="form-box--servicos">
              <div className="label-box">
                <label htmlFor={`descricao`}>
                  <span>Descrição</span>
                </label>
                <input
                  className="input-box"
                  name={`descricao`}
                  type="text"
                  value={servico.descricao}
                  onChange={(e) =>
                    handleChangeServico(index, "descricao", e.target.value)
                  }
                />
              </div>
              <div className="label-box">
                <label htmlFor={`preco`}>
                  <span>Preço</span>
                </label>
                <input
                  className="input-box"
                  name={`preco`}
                  type="text"
                  value={servico.preco}
                  step="0.01" 
                  min="0.01"
                  onChange={(e) =>
                    handleChangeServico(index, "preco", e.target.value)
                  }
                />
              </div>
            </form>
          </div>
        ))}
        <button onClick={adicionarServico} className="btn btn-adicionar">
          Adicionar Serviço
        </button>
      </div>
      <div className="buttons">
        <button onClick={handleSubmit} className="btn btn-salvar">
          Salvar
        </button>
        <button onClick={() => navigate('/')} className="btn btn-cancelar">
          Voltar
        </button>
      </div>

    </div>
  );
};

export default CadastrarOrdem;
