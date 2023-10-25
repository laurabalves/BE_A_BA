import "./styles.css";
import Table from "react-bootstrap/Table";
import { DownloadSimple, MagnifyingGlass } from "phosphor-react";
import { LoginContext } from "../../context/LoginContext";
import { useContext, useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CloudArrowDown } from "phosphor-react";

export function DashBoard() {
  // chamada o backend que vai se conectar ao banco de dados e trazer o dado necessário para a tabela
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
  const filteredTemplates = templates.filter((template) =>
    template.nome_template.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="in">
      <h1>Dashboard</h1>
      <div className="div-pesquisar">
        <div className="input-container">
          <input
            className="pesquisar"
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      <div
        className="tabela-header"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <Table striped hover>
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "rgb(27, 163, 84)",
                  color: "white",
                  padding: "20px",
                }}
              >
                Nome do arquivo
              </th>
              <th
                style={{
                  backgroundColor: "rgb(27, 163, 84)",
                  color: "white",
                  padding: "20px",
                }}
              >
                Quem criou
              </th>
              <th
                style={{
                  backgroundColor: "rgb(27, 163, 84)",
                  color: "white",
                  padding: "20px",
                }}
              >
                Data
              </th>
              <th
                style={{
                  backgroundColor: "rgb(27, 163, 84)",
                  color: "white",
                  padding: "20px",
                }}
              >
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template) => {
              return (
                <tr key={template.idtemplate}>
                  <td>{template.nome_template}</td>
                  <td>{template.usuario && template.usuario.nome}</td>
                  <td>
                    {format(new Date(template.data_criacao), "dd/MM/yyyy")}
                  </td>
                  <td>
                    <a className="download" href="">
                      <CloudArrowDown size={32} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="box">
        <div className="qtnArq">{filteredTemplates.length} arquivos</div>
      </div>
    </div>
  );
}
