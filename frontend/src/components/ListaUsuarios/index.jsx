import "./styles.css";

const mockUsuarios = [
  {
    id: 1,
    nome: "Laura",
    isAdm: false,
  },
  {
    id: 2,
    nome: "Matheus",
    isAdm: true,
  },
  {
    id: 3,
    nome: "Eliete",
    isAdm: false,
  },
  {
    id: 4,
    nome: "Mayara",
    isAdm: false,
  },
  {
    id: 5,
    nome: "Zé",
    isAdm: false,
  },
];

export function ListaUsuarios() {
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

        {mockUsuarios.map((dado) => {
          console.log(dado);
          return (
            <div key={dado.nome}>
              {" "}
              <br />
              <p className="nomes">{dado.nome}</p>
              <select onChange={handleChange}>
                <option
                  className="option"
                  id={dado.id}
                  value="adm"
                  selected={dado.isAdm}
                >
                  Administrador
                </option>
                <option id={dado.id} value="usuario" selected={!dado.isAdm}>
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
