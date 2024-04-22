import React from "react";
import { useNavigate } from "react-router-dom";

export default function Voltar(){
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
        window.location.reload();
    };

    return(
        <button onClick={handleNavigate} className="btn btn-cancelar">
          Voltar
        </button>
    )
}
