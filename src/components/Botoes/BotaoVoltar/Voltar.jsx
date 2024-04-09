import React from "react";
import { useNavigate } from "react-router-dom";

export default function Voltar(){
    const navigate = useNavigate();
    return(
        <button onClick={() => navigate("/")} className="btn btn-cancelar">
          Voltar
        </button>
    )
}