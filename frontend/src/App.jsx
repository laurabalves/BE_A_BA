import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./global.css";
import "@radix-ui/themes/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Default layout
import { DefaultLayout } from "./layouts/DefaultLayout";

import { DashBoard } from "./components/DashBoard";
import { Login } from "./components/Login";

import { ListaUsuarios } from "./components/ListaUsuarios";
import { GerenciarTemplate } from "./components/GerenciarTemplate";
import { TemplateUsuario } from "./components/TemplateUsuario";
import { CriarTemplate } from "./components/CriarTemplate";
import { LoginContextProvider } from "./context/LoginContext";

export function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/gerenciamento-de-usuarios"
              element={<ListaUsuarios />}
            />
            <Route
              path="/gerenciamento-de-template"
              element={<GerenciarTemplate />}
            />
            <Route path="/template-usuario" element={<TemplateUsuario />} />
            <Route path="/criar-template" element={<CriarTemplate />} />
          </Route>
          <Route path="/login">
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}
