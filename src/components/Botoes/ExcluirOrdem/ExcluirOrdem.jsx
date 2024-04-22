import React, { useState } from "react";
import "../ExcluirOrdem/excluirOrdem.css";
import Popup from "../../popup/popup";

export default function ExcluirOrdem(props) {
  const [showPopup, setShowPopup] = useState(false);

    const handleSuccessResponse = () => {
      setShowPopup(true);
    };

    const handleClosePopup = () => {
      setShowPopup(false);
  };
  
  function handleDelete() {
    const apiUrl = `${props.ordemData.endPoint}/id/${props.ordemData.id}`;

    fetch(apiUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        handleSuccessResponse();
        console.log("Linha excluída com sucesso:", data);
      })
      .catch((error) => {
        console.error("Erro ao excluir linha:", error);
      });
  }

  return (
    <div>
      <button className="btn btn-excluir" onClick={handleDelete}>
        Excluir Ordem
      </button>
      {showPopup && (
        <Popup message="Operação realizada com sucesso!" onClose={handleClosePopup} />
      )}
    </div>
    
  );
}
