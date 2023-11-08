import React, { useContext, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";
import { MaterialSnackbar } from "../SnackBar";

export const TemplateUsuario = () => {
  const { login } = useContext(LoginContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  function openSnackbar(type, message) {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }
  const [templatesPorUsuario, setTemplatesPorUsuario] = useState([]);

  async function getTemplatesPorUsuario() {
    try {
      const { idusuario } = login;

      const { data: templates } = await axios.get(
        `http://localhost:4000/api/templates/usuario/${idusuario}`
      );

      setTemplatesPorUsuario(templates);
    } catch (error) {
      console.error("Erro carregando todos os templates no dashboard", error);
    }
  }
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
        }, 3000);
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

  const downloadTemplate = async (templateId) => {
    event.preventDefault();
    window.open(`http://localhost:4000/api/templates/${templateId}`, "_blank");
  };
  useEffect(() => {
    getTemplatesPorUsuario();
  }, []);
  return (
    <div>
      <div className="cabeca">
        <h1>Meus templates</h1>
        <br />

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
                {templatesPorUsuario
                  .filter((template) => template.status)
                  .map((template) => {
                    return (
                      <tr key={template.idtemplate}>
                        <td>{template.nome_template}</td>
                        <td>{template.usuario.nome}</td>
                        <td>{template.extensao}</td>
                        <td>{template.campo.length}</td>

                        <td>
                          <button
                            className="download"
                            onClick={() =>
                              downloadTemplate(template.idtemplate)
                            }
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
        <div className="cabeca"></div>
      </div>
    </div>
  );
};
