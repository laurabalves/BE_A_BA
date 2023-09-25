import "./styles.css";
import Table from "react-bootstrap/Table";
import { CloudArrowDown, CloudArrowUp } from "phosphor-react";
import "bootstrap/dist/css/bootstrap.min.css";

export function GerenciarTemplate() {
  return (
    <div className="cabeca">
      <h1>Gerenciamento de Template</h1>
      <div>
        <div className="come">
          <Table striped bordered hover>
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
              <tr>
                <td>xxx</td>
                <td>Laura</td>
                <td>XLS</td>
                <td>4</td>
                <td>
                  <button className="botao-ativar">ativar</button>{" "}
                  <button className="botao-desativar">desativar</button>
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
              <tr>
                <td>zzz</td>
                <td>Jacob</td>
                <td>CSV </td>
                <td>4</td>
                <td>
                  <button className="botao-ativar">ativar</button>{" "}
                  <button className="botao-desativar">desativar</button>
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
              <tr>
                <td>7</td>
                <td>matheus</td>
                <td>xls</td>
                <td>5</td>
                <td>
                  <button className="botao-ativar">ativar</button>{" "}
                  <button className="botao-desativar">desativar</button>
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
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
