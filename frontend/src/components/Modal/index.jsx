import { CloudArrowUp } from "phosphor-react";
import React, { useState } from "react";
import { MaterialSnackbar } from "../SnackBar";

import axios from "axios";
import "./styles.css";

export function Modal({
  isOpen,
  closeModal,
  template,
  login,
  handleModalState,
}) {
  const [selectedDir, setSelectedDir] = useState("Administração");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function openSnackbar(type, message) {
    console.log("abrindo snackbar:", type, message);
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }
  const handleFileChange = async (e) => {
    try {
      setLoading(true);
      const idtemplate = e.target.id;

      console.log(template);
      console.log("idtemplate => ", idtemplate);
      console.log("selectedDir => ", selectedDir);

      const file = e.target.files[0];
      if (file) {
        openSnackbar("success", "Carregando...");
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 9000);
        const formData = new FormData();
        formData.append("idtemplate", idtemplate);
        formData.append("idusuario", login.idusuario);
        formData.append("dirResult", selectedDir);
        formData.append("data", new Date());
        formData.append("nome_arquivo", file.name);
        formData.append("file", file);

        const uploadResponse = await axios.post(
          "http://localhost:4000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        handleModalState(false, idtemplate);
        const idupload = uploadResponse.data.idupload;
        const statusTimer = setInterval(async () => {
          try {
            const statusResponse = await axios.get(
              `http://localhost:4000/api/upload/is-template-valid/${idupload}`
            );

            const status = statusResponse.data.status;

            if (status === "validado") {
              alert("Arquivo validado com sucesso");
              setLoading(false);
              clearInterval(statusTimer);
            } else if (status === "invalido") {
              alert("Ocorreu um erro na validação do arquivo");
              setLoading(false);
              clearInterval(statusTimer);
            }
          } catch (err) {
            setLoading(false);
            console.error("err on status check => ", err);
            openSnackbar(
              "error",
              "Erro na verificação do status. Tente novamente mais tarde."
            );
            closeModal();
          }
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error("err on upload => ", err);
      openSnackbar(
        "error",
        "Erro no upload. Por favor, tente novamente mais tarde."
      );
      closeModal();
    }
  };
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="text">
          Indique o repositório para armazenar o arquivo após a validação!
        </div>
        <select
          value={selectedDir}
          onChange={(e) => setSelectedDir(e.target.value)}
        >
          <option value="Administração">Administração</option>
          <option value="Operações">Operações</option>
          <option value="TI Quero Quero">TI Quero Quero</option>
        </select>

        <label
          className={`upload ${loading ? "disabled" : ""}`}
          htmlFor={template.idtemplate}
        >
          <CloudArrowUp size={32} />
        </label>
        <input
          name={template.idtemplate}
          id={template.idtemplate}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <MaterialSnackbar
          type={snackbarType}
          open={snackbarOpen}
          onClose={() => {
            console.log("Snackbar Fechado");
            setSnackbarOpen(false);
          }}
          style={{ zIndex: 9999 }}
        >
          {snackbarMessage}
        </MaterialSnackbar>
      </div>
    </div>
  );
}
