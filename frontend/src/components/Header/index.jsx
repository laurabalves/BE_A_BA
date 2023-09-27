import "./style.css";

import { Link } from "react-router-dom";

import Logo from "../../assets/logo.svg";
import {
  PresentationChart,
  Users,
  File,
  FolderSimplePlus,
  SignOut,
} from "phosphor-react";

import { tipoUsuario } from "../../mockTipoUsuario";

export function Header() {
  return (
    <header>
      <div className="header-info">
        <img className="logo" src={Logo} alt="" />

        {!!tipoUsuario.isAdm && (
          <Link className="header-link" to="/dashboard">
            <PresentationChart size={32} /> DashBoard{" "}
          </Link>
        )}
        {!!tipoUsuario.isAdm && (
          <Link className="header-link" to="/gerenciamento-de-usuarios">
            <Users size={32} /> Lista de Usuarios
          </Link>
        )}
        <Link className="header-link" to="/gerenciamento-de-template">
          <File size={32} /> Gerenciamento de Templates
        </Link>
        <Link className="header-link" to="/criar-template">
          <FolderSimplePlus size={32} /> Criar Template
        </Link>
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
