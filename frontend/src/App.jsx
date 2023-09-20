import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./global.css";

// Default layout
import { DefaultLayout } from "./layouts/DefaultLayout";

// Login layout
import { LoginLayout } from "./layouts/LoginLayout";

import { DashBoard } from "./components/DashBoard";
import { Login } from "./components/Login";

import { ListaUsuarios } from "./components/ListaUsuarios";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route
            path="/gerenciamento-de-usuarios"
            element={<ListaUsuarios />}
          />
        </Route>
        <Route path="/login" element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
