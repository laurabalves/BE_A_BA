import "./styles.css";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoginContext } from "../../context/LoginContext";

export function CriarTemplate() {
  const { register, handleSubmit, reset } = useForm();
  const { login } = useContext(LoginContext);

  //bloco de input
  const [blocos, setBlocos] = useState([]);

  const handleConlunas = (e) => {
    const blocoArray = [];
    let qtdColunas = e.target.value;

    while (qtdColunas > 0) {
      blocoArray.push({ input: "", select: "Opção 1" });
      qtdColunas = qtdColunas - 1;
    }

    setBlocos(blocoArray);
  };

  async function handleCreateTemplate(campos) {
    try {
      const { nomeTemplate, extensao } = campos;
      const qtdCol = blocos.length;

      const colunas = blocos.map((b, index) => {
        const tipo = campos[`tipoCol-${index}`];
        const nome_campo = campos[`tipoNome-${index}`];

        return {
          tipo,
          nome_campo,
        };
      });

      const { data } = await axios.post("http://localhost:4000/api/templates", {
        nomeTemplate,
        extensao,
        idusuario: login.idusuario,
        colunas,
      });

      reset();
      setBlocos([]);
    } catch (err) {
      console.error("ero na req : post ", err);
    }
  }

  return (
    <div className="testandooo">
      <div>
        <h2 className="criar"> Criar template</h2>
        <p>Insira as informações abaixo:</p>
      </div>

      <form onSubmit={handleSubmit(handleCreateTemplate)}>
        <div>
          <label htmlFor="nomeTemplate">Nome do template:</label>
          <input
            className="nomeTamplete"
            required
            type="text"
            placeholder="Insira o nome do template"
            {...register("nomeTemplate")}
          />
        </div>
        <div>
          <label htmlFor="extensao">Escolha a Extensão:</label>
          <select className="extensao" {...register("extensao")}>
            <option value="CSV" defaultChecked>
              CSV
            </option>
            <option value="XLS">XLS</option>
            <option value="XLSX">XLSX</option>
          </select>
        </div>
        <label htmlFor="qntColuna">Quantidade de coluna(s):</label>
        <input
          type="number"
          name="qntColuna"
          required
          placeholder="n° de coluna(s)"
          onChange={handleConlunas}
        />
        <div className="blocos-container">
          {blocos.map((bloco, index) => (
            <div key={index} className="key">
              <select
                className="select-bloco"
                required
                {...register(`tipoCol-${index}`)}
              >
                <option required value="text">
                  Numero
                </option>
                <option required value="number">
                  Texto
                </option>
                <option required value="date">
                  Data
                </option>
              </select>

              <input
                type="text"
                placeholder="Nome da coluna"
                required
                {...register(`tipoNome-${index}`)}
              />
            </div>
          ))}
        </div>
        <button type="submit">cadastrar template</button>
      </form>
      <div className="tabela-preview-container">
        <table className="tabela-preview">
          <tbody>
            <tr>
              <th>Nome</th>
            </tr>
            <tr>
              <td>{}</td>
            </tr>
            <tr>
              <th>Colunas</th>
            </tr>
            <tr>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
