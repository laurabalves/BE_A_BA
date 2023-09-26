import "./styles.css";
import { useState } from "react";

export function CriarTemplate() {
  //gerenciamento de dados

  // colunas
  const [colunas, setqntColunas] = useState();
  const handleConlunas = (e) => {
    setqntColunas(e.target.value);
  };
  console.log(colunas);

  //nome do template
  const [name, setName] = useState();
  const handleName = (e) => {
    setName(e.target.value);
  };
  console.log(name);

  // blocos de input
  const [blocos, setBlocos] = useState([]);
  const handleBlocos = (e) => {
    setBlocos(e.target.values);
  };

  // dados dos blocos de input
  const handleInputChange = (index, campo, valor) => {
    const novoBlocos = [...blocos];
    novoBlocos[index][campo] = valor;
    setBlocos(novoBlocos);
  };
  console.log(blocos);

  //botao que add os blocos de acordo com a qnt de colunas
  const handleSubmit = (evento) => {
    evento.preventDefault();
    const novoBlocos = Array.from({ length: colunas }, (_, index) => ({
      input: "",
      select: "Opção 1", // Altere de acordo com a opção padrão desejada
    }));
    setBlocos(novoBlocos);
    console.log("CHEGURI");
  };
  return (
    <div>
      <div>
        {" "}
        <h3> Criar Template</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeTemplate">Nome do Template</label>
          <input
            type="text"
            name="nomeTemplate"
            placeholder="Insira o nome do template"
            onChange={handleName}
          />
        </div>
        <label htmlFor="qntColuna">Quantidade de colunas</label>
        <input
          type="number"
          name="qntColuna"
          placeholder=""
          onChange={handleConlunas}
        />

        <input type="submit" value="Enviar" />
      </form>
      {blocos.map((bloco, index) => (
        <div key={index}>
          {/* Input */}
          <select
            value={bloco.select}
            onChange={(e) => handleInputChange(index, "select", e.target.value)}
          >
            <option value="Opção 1">Numero</option>
            <option value="Opção 2">Letra </option>
            <option value="Opção 3">Data 3</option>
          </select>

          <input
            type="text"
            placeholder="Preencha o input"
            value={bloco.input}
            required
            onChange={(e) => handleInputChange(index, "input", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
