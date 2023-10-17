import "./styles.css";
import { useState } from "react";

export function CriarTemplate() {
  //colunas
  const [colunas, setqntColunas] = useState(0);
  //nome
  const [name, setName] = useState("");
  //bloco de input
  const [blocos, setBlocos] = useState([]);

  const [namePreview, setNamePreview] = useState("");
  const [colunasPreview, setColunasPreview] = useState([]);
  const [formData, setFormData] = useState({
    extensao: "",
  });
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

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNamePreview(newName);
  };

  const handleColunasChange = (e, index) => {
    const newColunas = [...blocos];
    newColunas[index].input = e.target.value;
    setBlocos(newColunas);

    const newColunasPreview = newColunas.map((bloco, i) => {
      if (i === index) {
        return e.target.value;
      } else {
        return bloco.input;
      }
    });
    setColunasPreview(newColunasPreview);
  };
  // Botão para salvar os dados

  const handleSave = () => {
    const dado = {
      name: name,
      colunas: blocos,
      extensao: formData.extensao,
    };
    console.log(dado);
  };

  return (
    <div className="testandooo">
      <div>
        <h2 className="criar"> Criar template</h2>
        <p>Insira as informações abaixo:</p>
      </div>

      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="nomeTemplate">Nome do template:</label>
          <input
            className="nomeTamplete"
            type="text"
            name="nomeTemplate"
            placeholder="Insira o nome do template"
            value={name}
            onChange={handleNameChange}
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
        />
        <br />
      </form>
      <div className="blocos-container">
        {blocos.map((bloco, index) => (
          <div key={index} className="key">
            <select
              className="select-bloco"
              value={bloco.select}
              required
              onChange={(e) => handleInputChange(e, "select", e.target.value)}
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
              onChange={(e) => handleColunasChange(e, index)}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSave}>salvar</button>
      <div className="tabela-preview-container">
        <table className="tabela-preview">
          <tbody>
            <tr>
              <th>Nome</th>
            </tr>
            <tr>
              <td>{namePreview}</td>
            </tr>
            <tr>
              <th>Colunas</th>
            </tr>
            <tr>
              <td>{colunasPreview.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
