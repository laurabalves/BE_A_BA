import React, { useContext, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";

const iserir = [
  {
    nomeArquivo: "Total_distribuidora",
    colunas: 6,
  },
];

export const TemplateUsuario = () => {
  const { login } = useContext(LoginContext);
  // chamada o backend que vai se conectar ao banco de dados e trazer o dado necessário para a tabela
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
                {templatesPorUsuario.map((template) => {
                  return (
                    <tr key={template.idtemplate}>
                      <td>{template.nome_template}</td>
                      <td>{template.usuario.nome}</td>
                      <td>{template.extensao}</td>
                      <td>{template.campo.length}</td>

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
        <div className="cabeca">
          <h1>Meus arquivos</h1>
        </div>

        <div className="comec">
          <Table striped shover="true">
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
                  Colunas
                </th>
              </tr>
            </thead>

            <tbody>
              {iserir.map((dados) => {
                return (
                  <tr>
                    <td>{dados.nomeArquivo}</td>
                    <td>{dados.colunas}</td>
                    <td style={{ width: "200px" }}>
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
      </div>
    </div>
  );
};
