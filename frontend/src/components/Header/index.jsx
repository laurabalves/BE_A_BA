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

import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export function Header() {
  const { login } = useContext(LoginContext);

  return (
    <header>
      <div className="header-info">
        <img className="logo" src={Logo} alt="" />

        {/* fazendo a verificacao condicional. se for verdadeira os links serao renderizadossss*/}
        {/* (login.isadm === true mesma coisa */}
        {!!login.isadm && (
          <Link className="header-link" to="/dashboard">
            <PresentationChart size={32} /> DashBoard{" "}
          </Link>
        )}
        {!!login.isadm && (
          <Link className="header-link" to="/gerenciamento-de-usuarios">
            <Users size={32} /> Lista de Usuarios
          </Link>
        )}

        {!!login.isadm && (
          <Link className="header-link" to="/gerenciamento-de-template">
            <File size={32} /> Gerenciamento de Templates
          </Link>
        )}
        <Link className="header-link" to="/criar-template">
          <FolderSimplePlus size={32} /> Criar Template
        </Link>

        {!!!login.isadm && (
          <Link className="header-link" to="/template-usuario">
            <File size={32} /> Meus arquivos/templates
          </Link>
        )}
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
