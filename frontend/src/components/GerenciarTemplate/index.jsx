import "./styles.css";
import Table from "react-bootstrap/Table";

import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MaterialSnackbar } from "../SnackBar";
import { LoginContext } from "../../context/LoginContext";

export function GerenciarTemplate() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previousTemplates, setPreviousTemplates] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(LoginContext);
  function openSnackbar(type, message) {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }
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
  const handleFileChange = async (e) => {
    try {
      setLoading(true);
      const idtemplate = e.target.id;
      const file = e.target.files[0];
      if (file) {
        openSnackbar("success", "Carregando...");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("idtemplate", idtemplate);
        formData.append("idusuario", login.idusuario);
        formData.append("data", new Date());
        formData.append("nome_arquivo", file.name);

        const uploadResponse = await axios.post(
          "http://localhost:4000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const idupload = uploadResponse.data.idupload;

        const statusTimer = setInterval(async () => {
          const statusResponse = await axios.get(
            `http://localhost:4000/api/upload/is-template-valid/${idupload}`
          );

          const status = statusResponse.data.status;

          if (status === "validado" || status === "invalido") {
            clearInterval(statusTimer);
            let message = "";

            if (status === "validado") {
              message = "Arquivo validado com sucesso";
            } else if (status === "invalido") {
              message = "Ocorreu um erro na validação do arquivo";
            }

            openSnackbar(status === "validado" ? "success" : "error", message);

            setLoading(false);
          }
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      console.error("err on upload => ", err);
      openSnackbar(
        "error",
        "Erro no upload. Por favor, tente novamente mais tarde."
      );
    }
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
          <div className="loading-indicator"></div>

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
                      <label className="upload" for={template.idtemplate}>
                        <CloudArrowUp size={32} />
                        <MaterialSnackbar
                          type={snackbarType}
                          open={snackbarOpen}
                          onClose={() => setSnackbarOpen(false)}
                        >
                          {snackbarMessage}
                        </MaterialSnackbar>
                      </label>
                      <input
                        name={template.idtemplate}
                        id={template.idtemplate}
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
