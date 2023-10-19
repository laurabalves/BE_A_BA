import "./styles.css";
import Table from "react-bootstrap/Table";

import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function GerenciarTemplate() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previousTemplates, setPreviousTemplates] = useState([]);

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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Nome do arquivo: ", file.name);
      console.log("Tipo de arquivo: ", file.type);
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };
  const updateTemplateStatus = async (templateId, isActive) => {
    try {
      await axios.put(`http://localhost:4000/api/templates/${templateId}`, {
        isActive,
      });
      const updatedTemplates = [...templates];
      const templateIndex = updatedTemplates.findIndex(
        (template) => template.idtemplate === templateId
      );
      updatedTemplates[templateIndex].status = isActive;
      // Atualize o estado do template localmente após a alteração no servidor.
      setTemplates(updatedTemplates);
      console.log(templateIndex);
    } catch (error) {
      console.error("Erro ao atualizar o status do template", error);
    }
  };
  return (
    <div className="cabeca">
      <h1>Gerenciamento de Template</h1> <br />
      <div>
        <div className="tabela-header">
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
                  Nome Template
                </th>
                <th
                  style={{
                    backgroundColor: "rgb(27, 163, 84)",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  Usuario
                </th>
                <th
                  style={{
                    backgroundColor: "rgb(27, 163, 84)",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  Formato
                </th>
                <th
                  style={{
                    backgroundColor: "rgb(27, 163, 84)",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  Colunas
                </th>
                <th
                  style={{
                    backgroundColor: "rgb(27, 163, 84)",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  Operação
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
                <th
                  style={{
                    backgroundColor: "rgb(27, 163, 84)",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  Upload
                </th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => {
                return (
                  <tr key={template.idtemplate}>
                    <td>{template.nome_template}</td>
                    <td>{template.usuario.nome}</td>
                    <td>{template.extensao}</td>
                    <td>{template.extensao}</td>
                    <td>
                      <select
                        className="status"
                        name=""
                        id=""
                        onChange={(e) =>
                          updateTemplateStatus(
                            template.idtemplate,
                            e.target.value === "Ativar template"
                          )
                        }
                        value={
                          template.status
                            ? "Ativar template"
                            : "Desativar template"
                        }
                      >
                        <option value="Ativar template">Ativar template</option>
                        <option value="Desativar template">
                          Desativar template
                        </option>
                      </select>
                    </td>
                    <td>
                      <a className="download" href="">
                        <CloudArrowDown size={32} />
                      </a>
                    </td>

                    <td>
                      <a className="upload" onClick={handleUploadClick}>
                        <CloudArrowUp size={32} />
                      </a>
                      <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
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
