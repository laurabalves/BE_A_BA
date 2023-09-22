import "./styles.css";
import Logo from "../../assets/logo.svg";

export function Login() {
  return (

	

    <div>
		<header>
		<img className="Logo" src={Logo} alt="" />
          <h1>Sistema de gerenciamento de templates</h1>

		</header>
		
		
      <form>
        <h2>Login</h2>
        <label>Matricula</label>
       
	    <input className="login-input" type="text" placeholder="Matricula" />
        <label>Senha</label>
       
	    <input className="login-input" type="text" placeholder="senha" />
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
}
