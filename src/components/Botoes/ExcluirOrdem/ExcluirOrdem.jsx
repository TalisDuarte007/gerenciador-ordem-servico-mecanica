import React from "react";
import '../ExcluirOrdem/excluirOrdem.css'

export default function ExcluirOrdem(id){

    function handleDelete(id) {
        const apiUrl = `https://sheetdb.io/api/v1/9ned902qlo87s/id/${id.props}`;
        
        fetch(apiUrl, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            console.log('Linha excluída com sucesso:', data);
          })
          .catch(error => {
            console.error('Erro ao excluir linha:', error);
          });
      }

    return(
        <button className="btn btn-excluir" onClick={() => handleDelete(id)}>Excluir Ordem</button>
    )
}