import "./style.css";

import Logo from "../../assets/logo.svg";
import {
  PresentationChart,
  Users,
  File,
  FolderSimplePlus,
  SignOut,
} from "phosphor-react";

export function Header() {
  return (
    <header>
      <div className="header-info">
        <img className="logo" src={Logo} alt="" />

        <a className="header-link" href="/dashboard">
          <PresentationChart size={32} /> DashBoard{" "}
        </a>
        <a className="header-link" href="/gerenciamento-de-usuarios">
          <Users size={32} /> Lista de Usuarios
        </a>
        <a className="header-link" href="/gerenciamento-de-template">
          <File size={32} /> Gerenciamento de Templates
        </a>
        <a className="header-link">
          <FolderSimplePlus size={32} /> Criar Template
        </a>
      </div>

      <div className="header-user-info">
        <div className="head">
          <p className="user">Usuario:</p>
          <p className="idUsuario">nome do usuario</p>
        </div>

        <button className="sair">
          <SignOut size={32} /> Sair
        </button>
      </div>
    </header>
  );
}
