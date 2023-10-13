import "./styles.css";
import Table from "react-bootstrap/Table";
import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

/*const mockDados = [
  { nomeArquivo: "Produção", ususario: "Laura", formato: "XXLS", colunas: 6 },

  { nomeArquivo: "Vendas", ususario: "Matheus", formato: "CSV", colunas: 7 },

  { nomeArquivo: "Estoque", ususario: "Eliete", formato: "XLS", colunas: 4 },

  { nomeArquivo: "Liquidação", ususario: "Mayara", formato: "CSV", colunas: 8 },
];*/

export function GerenciarTemplate() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  async function getAllTemplates() {
    try {
      const { data: allTemplates } = await axios.get(
        "http://localhost:4000/api/templates/alltemplates"
      );

      setTemplates(allTemplates);
    } catch (error) {
      console.error("Erro carregando todos os templates no dashboard", error);
    }
  }

  useEffect(() => {
    getAllTemplates();
  }, []);
  return (
    <div className="cabeca">
      <h1>Gerenciamento de Template</h1> <br />
      <div>
        <div className="tabela-header">
          <Table striped hover>
            <thead>
              <tr>
                <th className="p-3 bg-success ">Nome Template</th>
                <th className="p-3 bg-success ">Usuario</th>
                <th className="p-3 bg-success ">Formato</th>
                <th className="p-3 bg-success ">Colunas</th>
                <th className="p-3 bg-success ">Operação</th>
                <th className="p-3 bg-success ">Download</th>
                <th className="p-3 bg-success ">Upload</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => {
                return (
                  <tr>
                    <td>{template.nome_template}</td>
                    <td>{template.usuario.nome}</td>
                    <td>{template.extensao}</td>
                    <td>{template.extensao}</td>
                    <td>
                      <select name="" id="">
                        <option value="">Ativar template</option>
                        <option value="">Desativar template</option>
                      </select>
                    </td>
                    <td>
                      <a className="download" href="">
                        <CloudArrowDown size={32} />
                      </a>
                    </td>

                    <td>
                      <a className="upload" href="">
                        <CloudArrowUp size={32} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
