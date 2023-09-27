import React from "react";

import Table from "react-bootstrap/Table";
import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

const mockDados = [
  {
    nomeTemplate: "contabilidade",
    usuario: "Laura Beatriz",
    extensao: "XLSX",
    colunas: 7,
  },
  {
    nomeTemplate: "advogacia",
    usuario: "Patricia Rodrigues",
    extensao: "CSV",
    colunas: 4,
  },
  {
    nomeTemplate: "publicidade",
    usuario: "Jose Lopes",
    extensao: "XLS",
    colunas: 8,
  },
];

const iserir = [
  {
    nomeArquivo: "Total_distribuidora",
    colunas: 6,
  },
];

export const TemplateUsuario = () => {
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
                  <th className="p-3 bg-success  ">Nome Template</th>
                  <th className="p-3 bg-success ">Usuario</th>
                  <th className="p-3 bg-success ">Formato</th>
                  <th className="p-3 bg-success ">Colunas</th>

                  <th className="p-3 bg-success ">Download</th>
                  <th className="p-3 bg-success ">Upload</th>
                </tr>
              </thead>
              <tbody>
                {mockDados.map((infos) => {
                  return (
                    <tr>
                      <td>{infos.nomeTemplate}</td>
                      <td>{infos.usuario}</td>
                      <td>{infos.extensao}</td>
                      <td>{infos.colunas}</td>

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
          <Table striped shover>
            <thead>
              <tr>
                <th
                  className="p-3 bg-success"
                  style={{ width: "200px", borderRadius: "10px" }}
                >
                  Nome Template
                </th>
                <th
                  className="p-3 bg-success"
                  style={{ width: "200px", borderRadius: "10px" }}
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
