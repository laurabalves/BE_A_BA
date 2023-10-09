import "./styles.css";
import Table from "react-bootstrap/Table";
import { DownloadSimple } from "phosphor-react";
import { LoginContext } from "../../context/LoginContext";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const mockDados = [
  {
    id: 1,
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Laura",
    dataCriacao: "16-07-2022",
    qtnCampos: 5,
    extensao: "csv",
  },
  {
    id: 2,
    nomeArquivo: "arquivos_casas_vendidas.xlsx",
    nomeAutor: "Mayara",
    dataCriacao: "12-08-2000",
    qtnCampos: 3,
    extensao: "csv",
  },
  {
    id: 3,
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Eliete",
    dataCriacao: "10-07-2003",
    qtnCampos: 10,
    extensao: "csv",
  },
  {
    id: 4,
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Eliete",
    dataCriacao: "10-07-2003",
    qtnCampos: 10,
    extensao: "csv",
  },
  {
    id: 5,
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Eliete",
    dataCriacao: "10-07-2003",
    qtnCampos: 10,
    extensao: "csv",
  },
  {
    id: 6,
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Alan",
    dataCriacao: "10-07-2003",
    qtnCampos: 4,
    extensao: "XLS",
  },
  {
    id: 7,
    nomeArquivo: "arquivo_casas_alugadas.xlsx",
    nomeAutor: "Eliete",
    dataCriacao: "10-07-2003",
    qtnCampos: 10,
    extensao: "csv",
  },
];

export function DashBoard() {
  // chamada o backend que vai se conectar ao banco de dados e trazer o dado necessário para a tabela
  const [templates, setTemplates] = useState([]);

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
              <th className="p-3 bg-success ">Download</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => {
              return (
                <tr key={template.idtemplate}>
                  <td>{template.nome_template}</td>
                  <td>{template.usuario.nome}</td>
                  <td>
                    {format(new Date(template.data_criacao), "dd/MM/yyyy")}
                  </td>
                  <td>
                    <a className="download" href="">
                      <DownloadSimple size={32} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="box">
        <div className="qtnArq">{templates.length} arquivos</div>
      </div>
    </div>
  );
}
