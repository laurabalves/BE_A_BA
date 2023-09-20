import "./style.css";

import Logo from "../../assets/logo.svg";
import { PresentationChart, Users } from "phosphor-react";

export function Header() {
  return (
    <header>
      <img className="eogo" src={Logo} alt="" />
      <img className="testes" src={Logo} alt="" />
      <button>
        <PresentationChart size={32} /> DashBoard{" "}
      </button>
      <button>
        <Users size={32} /> Lista de Usuarios
      </button>
      <button>
        <Users size={32} /> Lista de Usuarios
      </button>
    </header>
  );
}
