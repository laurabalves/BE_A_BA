import "./styles.css";
import Logo from "../../assets/logo.svg";

export function Login() {
  return (
    <div className="login">
      <header>
        <img className="Logo" src={Logo} alt="" />
      </header>

      <form>
        <div className="login-info">
          <h1>Sistema de gerenciamento de templates</h1>
          <h2>Login</h2>
        </div>
        <div className="login-inputs">
          <label>Matricula</label>
          <input className="login-input" type="text" placeholder="Matricula" />

          <label>Senha</label>
          <input className="login-input" type="text" placeholder="senha" />

          <button type="submit">Acessar</button>
        </div>
      </form>
    </div>
  );
}
