import React from "react";

import Table from "react-bootstrap/Table";
import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";

export const TemplateUsuario = () => {
  return (
    <div>
      <div className="cabeca">
        <h1>Meus templates</h1>
        <br />

        <div>
          <div className="come">
            <Table striped hover>
              <thead>
                <tr>
                  <th
                    className="p-3 bg-success  "
                    style={{ borderRadius: "10px" }}
                  >
                    Nome Template
                  </th>
                  <th
                    className="p-3 bg-success "
                    style={{ borderRadius: "10px" }}
                  >
                    Usuario
                  </th>
                  <th
                    className="p-3 bg-success "
                    style={{ borderRadius: "10px" }}
                  >
                    Formato
                  </th>
                  <th
                    className="p-3 bg-success "
                    style={{ borderRadius: "10px" }}
                  >
                    Colunas
                  </th>

                  <th
                    className="p-3 bg-success "
                    style={{ borderRadius: "10px" }}
                  >
                    Download
                  </th>
                  <th
                    className="p-3 bg-success "
                    style={{ borderRadius: "10px" }}
                  >
                    Upload
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xxx</td>
                  <td>Laura</td>
                  <td>XLS</td>
                  <td>4</td>

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
                <tr>
                  <td>zzz</td>
                  <td>Jacob</td>
                  <td>CSV </td>
                  <td>4</td>

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
                <tr>
                  <td>7</td>
                  <td>matheus</td>
                  <td>xls</td>
                  <td>5</td>

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
              <tr>
                <td>xxx</td>
                <td>4</td>
                <td style={{ width: "200px" }}>
                  <a className="download" href="">
                    <CloudArrowDown size={32} />
                  </a>
                </td>
              </tr>
              <tr>
                <td>zzz</td>
                <td>4</td>

                <td>
                  <a className="download" href="">
                    <CloudArrowDown size={32} />
                  </a>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>5</td>

                <td>
                  <a className="download" href="">
                    <CloudArrowDown size={32} />
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
