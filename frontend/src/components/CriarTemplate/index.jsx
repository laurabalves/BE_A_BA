import "./styles.css";
import { useState } from "react";

export function CriarTemplate() {
  // Gerenciamento de dados

  // Colunas
  const [colunas, setqntColunas] = useState(0); // Defina um valor padrão para colunas
  const handleConlunas = (e) => {
    setqntColunas(e.target.value);
    const blocoArray = [];
    let qtdColunas = e.target.value;

    while (qtdColunas > 0) {
      blocoArray.push({ input: "", select: "Opção 1" });
      qtdColunas = qtdColunas - 1;
    }
    setBlocos(blocoArray);
  };

  // Nome do template
  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Blocos de input
  const [blocos, setBlocos] = useState([]);
  const handleInputChange = (index, campo, valor) => {
    const novoBlocos = [...blocos];
    novoBlocos[index][campo] = valor;
    setBlocos(novoBlocos);
  };

  // Botão que adiciona os blocos de acordo com a quantidade de colunas
  const handleSubmit = (evento) => {
    evento.preventDefault();
    const novoBlocos = Array.from({ length: colunas }, (_, index) => ({
      input: "",
      select: "Opção 1",
    }));
    setBlocos(novoBlocos);
  };

  const [formData, setFormData] = useState({
    extensao: "",
  });

  // Botão para salvar os dados
  const handleSave = () => {
    const dado = {
      name: name,
      colunas: blocos,
      extensao: formData.extensao,
    };
    console.log(dado);
    // Você também pode atualizar o estado ou realizar outras ações aqui
  };
  return (
    <div className="testandooo">
      <div>
        <h2> Criar template</h2>
        <p>Insira as informações abaixo:</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeTemplate">Nome do template:</label>
          <input
            className="nomeTamplete"
            type="text"
            name="nomeTemplate"
            placeholder="Insira o nome do template"
            onChange={handleName}
          />
        </div>
        <div>
          <label htmlFor="extensao">Escolha a Extensão:</label>
          <select
            className="extensao"
            value={formData.extensao}
            onChange={(e) =>
              setFormData({ ...formData, extensao: e.target.value })
            }
          >
            <option value="CSV">CSV</option>
            <option value="XLS">XLS</option>
            <option value="XLSX">XLSX</option>
          </select>
        </div>
        <label htmlFor="qntColuna">Quantidade de coluna(s):</label>
        <input
          type="number"
          name="qntColuna"
          placeholder="n° de coluna(s)"
          onChange={handleConlunas}
        />{" "}
        <br />
      </form>
      <div className="blocos-container">
        {blocos.map((bloco, index) => (
          <div key={index} className="key">
            {/* Input */}
            <select
              className="select-bloco"
              value={bloco.select}
              required
              onChange={(e) =>
                handleInputChange(index, "select", e.target.value)
              }
            >
              <option required value="Opção 1">
                Numero
              </option>
              <option required value="Opção 2">
                Texto
              </option>
              <option required value="Opção 3">
                Data
              </option>
            </select>

            <input
              type="text"
              placeholder="Nome da coluna"
              value={bloco.input}
              required
              onChange={(e) =>
                handleInputChange(index, "input", e.target.value)
              }
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave}>salvar</button>
    </div>
  );
}
