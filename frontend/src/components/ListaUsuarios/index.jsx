import "./styles.css";

export function ListaUsuarios() {
  return (
    <div className="tudo"> 
      <div className="usuarios">
    <h1>Permissões de usuarios</h1>
    <br />
    <div className="user1">
      <p>Laura</p> 
      <select>
        <option value="">Administrador</option>
        <option value="">Padrao</option>
      </select>
    </div>
    <br />
    <div className="user2">
      <p>Matheus</p>
      <select>
        <option value="">Administrador</option>
        <option value="">Padrao</option>
      </select>
    </div>{" "}
    <br />
    <div>
      <p>Mayara</p>
      <select>
        <option value="">Administrador</option>
        <option value="">Padrao</option>
      </select>
    </div>{" "} <br />

    <div>
      <p>Eliete</p>
      <select>
        <option value="">Administrador</option>
        <option value="">Padrao</option>
      </select>
    </div>{" "} <br />


    <div>
      <p>Eliete</p>
      <select>
        <option value="">Administrador</option>
        <option value="">Padrao</option>
      </select>
    </div>{" "} <br />

    <div>
      <p>Eliete</p>
      <select>
        <option value="">Administrador</option>
        <option value="">Padrao</option>
      </select>
    </div>{" "}
    <br />
    <button className="editar">Editar</button>
  </div></div>
   
  );
}
