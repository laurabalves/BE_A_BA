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
      setUsuarios(dataUsuarios);
    } catch (error) {
      console.error("Erro ao carregar usuários: ", error);
    }
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  function handleChange(e) {
    const idusuario = e.target.getAttribute("data-idusuario");
    const role = e.target.value;

    const isadm = role === "adm";

    axios
      .put(`http://localhost:4000/api/usuarios/${idusuario}`, { isadm })
      .then((response) => {
        console.log(
          `Permissão do usuário ${idusuario} atualizada para ${role}`
        );
      })
      .catch((error) => {
        console.error("Erro ao atualizar a permissão do usuário: ", error);
      });
  }

  return (
    <div className="tudo">
      <div className="usuarios">
        <h1 className="permissao">Permissões de usuários</h1>

        {usuarios.map((dado) => (
          <div key={dado.idusuario}>
            <p className="nomes">{dado.nome}</p>
            <select
              className="usuarioss"
              onChange={handleChange}
              data-idusuario={dado.idusuario}
              value={dado.isadm ? "adm" : "usuario"}
            >
              <option className="adm" value="adm">
                Administrador
              </option>
              <option className="usuario" value="usuario">
                Padrão
              </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
