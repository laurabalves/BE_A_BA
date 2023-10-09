import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";

export function ListaUsuarios() {
  const { login } = useContext(LoginContext);

  const [usuarios, setUsuarios] = useState([]);

  async function getUsuarios() {
    try {
      const { data: dataUsuarios } = await axios.get(
        "http://localhost:4000/api/usuarios"
      );

      console.log("dataUsuarios => ", dataUsuarios);
      setUsuarios(dataUsuarios);
    } catch (error) {
      console.error("Erro ao carregar usuarios: ", error);
    }
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    console.log(option);
  }

  return (
    <div className="tudo">
      <div className="usuarios">
        <h1>Permissões de usuários</h1>

        {usuarios.map((dado) => {
          return (
            <div key={dado.idusuario}>
              <p className="nomes">{dado.nome}</p>
              <select onChange={handleChange}>
                <option
                  className="option"
                  id={dado.idusuario}
                  value="adm"
                  selected={dado.isadm}
                >
                  Administrador
                </option>
                <option
                  id={dado.idusuario}
                  value="usuario"
                  selected={!dado.isadm}
                >
                  Padrao
                </option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
