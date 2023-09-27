import "./styles.css";
import Logo from "../../assets/logo.svg";
import { useState } from "react";

export function Login() {
  const [form, setForm] = useState({
    matricula: "",
    senha: "",
  });

  const handleChange = (e) => {
    let newProp = form;
    newProp[e.target.name] = e.target.value;
    setForm({ ...newProp });
  };

  console.log(form);

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = "http://localhost:5173/dashboard";
  };
  return (
    <div className="login">
      <header>
        <img className="Logo" src={Logo} alt="" />
      </header>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="login-info">
          <h1>Sistema de gerenciamento eletrônico de templates</h1>
          <h2>Login</h2>
        </div>
        <div className="login-inputs">
          <label>Matricula</label>
          <input
            name="matricula"
            className="login-input"
            type="text"
            placeholder="Matricula"
            onChange={(e) => handleChange(e)}
            required
          />

          <label>Senha</label>
          <input
            required
            name="senha"
            className="login-input"
            type="text"
            placeholder="senha"
            onBlur={(e) => handleChange(e)}
          />

          <button type="submit">Acessar</button>
        </div>
      </form>
    </div>
  );
}
