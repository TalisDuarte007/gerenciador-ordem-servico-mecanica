import React from "react";
import "../ExcluirOrdem/excluirOrdem.css";

export default function ExcluirOrdem(props) {
  function handleDelete() {
    const apiUrl = `${props.ordemData.endPoint}/id/${props.ordemData.id}`;

    fetch(apiUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Linha excluída com sucesso:", data);
      })
      .catch((error) => {
        console.error("Erro ao excluir linha:", error);
      });
  }

  return (
    <button className="btn btn-excluir" onClick={handleDelete}>
      Excluir Ordem
    </button>
  );
}
