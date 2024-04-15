import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExcluirOrdem from "../../components/Botoes/ExcluirOrdem/ExcluirOrdem.jsx";
import icon from "../../views/x-icon.png";
import Voltar from "../../components/Botoes/BotaoVoltar/Voltar.jsx";
import "../cadastrar/cadastrar.css";
import "../../assets/home/home.css";

const EditarOrdem = () => {
  const endPoint = "https://sheetdb.io/api/v1/9ned902qlo87s";
  const [dataEditada, setDataEditada] = useState({});
  const [servicos, setServicos] = useState([]);

  const { state } = useLocation();
  const ordem = state?.item;

  useEffect(() => {
    setDataEditada(ordem);
    try {
      let dadosArray = JSON.parse(ordem.lista_servicos);
      setServicos(dadosArray); // Verifique se isso exibe corretamente seu array de objetos
    } catch (error) {
      console.error("Erro ao fazer parse da string JSON:", error);
    }
  }, [ordem]);

  const handleChangeEditado = (index, campo, valor) => {
    if (index !== undefined) {
      const servicosAtualizados = servicos.map((servico, i) => {
        if (i === index) {
          return { ...servico, [campo]: valor };
        }
        return servico;
      });
      setServicos(servicosAtualizados);
      setDataEditada((prevData) => ({
        ...prevData,
        lista_servicos: JSON.stringify(servicosAtualizados), // Atualize a lista de serviços na ordem
      }));
    } else {
      setDataEditada((prevData) => ({
        ...prevData,
        [campo]: valor,
      }));
    }
  };

  const removerServico = (index) => {
    setServicos((servicosAnteriores) => {
      return servicosAnteriores.filter((_, i) => i !== index);
    });
  };
  console.log(dataEditada);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${endPoint}/id/${dataEditada.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: dataEditada.nome,
          veiculo: dataEditada.veiculo,
          placa: dataEditada.placa,
          lista_servicos: JSON.stringify(servicos), // Envie apenas a lista de serviços atualizada
        }),
      });
      if (res.ok) {
        console.log("Ordem atualizada com sucesso!");
      } else {
        console.error("Falha ao atualizar a ordem.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a ordem:", error);
    }
  };

  return (
    <div className="content">
      <h2>Editar Ordem</h2>
      <form>
        <div className="label-box">
          <label htmlFor="nome">
            <span>Cliente:</span>
          </label>
          <input
            name="nome"
            type="text"
            value={dataEditada.nome || ""}
            onChange={(e) =>
              handleChangeEditado(undefined, "nome", e.target.value)
            }
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
            value={dataEditada.veiculo || ""}
            onChange={(e) =>
              handleChangeEditado(undefined, "veiculo", e.target.value)
            }
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
            value={dataEditada.placa || ""}
            onChange={(e) =>
              handleChangeEditado(undefined, "placa", e.target.value)
            }
            className="input-box"
          />
        </div>
      </form>
      <div>
        <h3>Serviços Realizados:</h3>
        {servicos.map((servico, index) => (
          <div key={`servico-${index}`} className="servico-container">
            <form className="form-box--servicos">
              <div className="label-box">
                <label htmlFor={`descricao-${index}`}>
                  <span>Descrição</span>
                </label>
                <input
                  className="input-box"
                  id={`descricao-${index}`}
                  type="text"
                  value={servico.descricao || ""}
                  onChange={(e) =>
                    handleChangeEditado(index, "descricao", e.target.value)
                  }
                />
              </div>
              <div className="label-box">
                <label htmlFor={`preco-${index}`}>
                  <span>Preço</span>
                </label>
                <input
                  className="input-box"
                  id={`preco-${index}`}
                  type="number"
                  value={servico.preco || ""}
                  step="0.01"
                  min="0.01"
                  onChange={(e) =>
                    handleChangeEditado(index, "preco", e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                className="btn btn-remover"
                onClick={() => removerServico(index)}
              >
                <img src={icon} alt="" className="image-btn--remover" />
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleSubmit} className="btn btn-salvar">
          Salvar
        </button>
        <Voltar />
      </div>

      <ExcluirOrdem props={ordem.id} />
    </div>
  );
};

export default EditarOrdem;
