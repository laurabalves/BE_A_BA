import "./styles.css";
import Table from "react-bootstrap/Table";
import { DownloadSimple } from "phosphor-react";

const mockDados = [
  {
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Laura",
    dataCriacao: "16-07-2022",
    qtnCampos: 5,
    extensao: "csv",
  },
  {
    nomeArquivo: "arquivos_casas_vendidas.xlsx",
    nomeAutor: "Mayara",
    dataCriacao: "12-08-2000",
    qtnCampos: 3,
    extensao: "csv",
  },
  {
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Eliete",
    dataCriacao: "10-07-2003",
    qtnCampos: 10,
    extensao: "csv",
  },
];

export function DashBoard() {
  // chamada o backend que vai se conectar ao banco de dados e trazer o dado necessário para a tabela

  return (
    <div className="in">
      <h1>Dashboard</h1>
      <div className="div-pesquisar">
        <input className="pesquisar" type="text" placeholder="Pesquisar" />
      </div>

      <div className="tabela-header">
        <Table striped hover>
          <thead>
            <tr>
              <th className="p-3 bg-success ">Nome do arquivo</th>
              <th className="p-3 bg-success ">Quem criou</th>
              <th className="p-3 bg-success ">Data</th>
              <th className="p-3 bg-success ">Qtn Campo</th>
              <th className="p-3 bg-success ">Download</th>
            </tr>
          </thead>
          <tbody>
            {mockDados.map((dado) => {
              return (
                <tr>
                  <td>{dado.nomeArquivo}</td>
                  <td>{dado.nomeAutor}</td>
                  <td>{dado.dataCriacao}</td>
                  <td>{dado.qtnCampos}</td>
                  <td>
                    <a className="download" href="">
                      <DownloadSimple size={32} />{" "}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="box">
        <div className="qtnArq">{mockDados.length} arquivos</div>
      </div>
    </div>
  );
}
