import "./styles.css";
import Table from "react-bootstrap/Table";

import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { MaterialSnackbar } from "../SnackBar";

export function GerenciarTemplate() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previousTemplates, setPreviousTemplates] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      const formData = new FormData();
      formData.append("csvFile", file);

      // Aqui você pode incluir informações sobre o template
      const templateData = {
        idtemplate: 40, // Substitua pelo ID apropriado
        idusuario: 1, // Substitua pelo ID apropriado
      };

      // Adicione informações do template aos dados do formulário
      formData.append("templateData", JSON.stringify(templateData));
      console.log(templateData);
      // Envie a solicitação para o back-end
      axios
        .post("http://localhost:4000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Upload bem-sucedido"); // Verifique se essa mensagem aparece no console // Lide com a resposta do servidor aqui
        })

        .catch((error) => {
          setSnackbarOpen(true);
          // Lide com erros de upload aqui
        });
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

  const downloadTemplate = async (templateId) => {
    event.preventDefault();
    window.open(`http://localhost:4000/api/templates/${templateId}`, "_blank");
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
                      <button
                        className="download"
                        onClick={() => downloadTemplate(template.idtemplate)}
                      >
                        <CloudArrowDown size={32} />
                      </button>
                    </td>

                    <td>
                      <button className="upload" onClick={handleUploadClick}>
                        <CloudArrowUp size={32} />
                        <MaterialSnackbar
                          open={snackbarOpen}
                          children="Ocorreu um erro na validação do arquivo"
                          onClose={() => setSnackbarOpen(false)}
                          type="error"
                        />
                      </button>

                      <input
                        name="csvFile"
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
