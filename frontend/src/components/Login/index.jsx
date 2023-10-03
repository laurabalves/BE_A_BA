import "./styles.css";
import Logo from "../../assets/logo.svg";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(LoginContext);
  const { register, handleSubmit } = useForm();

  async function handleLoginSubmit(dadosLogin) {
    try {
      const { data } = await axios.post("http://localhost:3333/login", {
        email: dadosLogin.email,
        senha: dadosLogin.senha,
      });

      handleLogin(data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">
      <header>
        <img className="Logo" src={Logo} alt="" />
      </header>

      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div className="login-info">
          <h1>Sistema de gerenciamento eletrônico de templates</h1>
          <h2>Login</h2>
        </div>
        <div className="login-inputs">
          <label>Email</label>
          <input
            name="email"
            className="login-input"
            type="text"
            placeholder="Matricula"
            {...register("email")}
            required
          />

          <label>Senha</label>
          <input
            required
            name="senha"
            className="login-input"
            type="text"
            placeholder="senha"
            {...register("senha")}
          />

          <button type="submit">Acessar</button>
        </div>
      </form>
    </div>
  );
}
