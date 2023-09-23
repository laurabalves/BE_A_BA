import "./styles.css";
import Table from "react-bootstrap/Table";

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
      <div>
        <label htmlFor=""></label>
        <input type="text" placeholder="Pesquisar" />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do arquivo</th>
            <th>Quem criou</th>
            <th>Data</th>
            <th>Qtn Campo</th>
            <th>Download</th>
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
                  <button>download</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="box">
        <div className="qtnArq">{mockDados.length} arquivos</div>
      </div>
    </div>
  );
}
