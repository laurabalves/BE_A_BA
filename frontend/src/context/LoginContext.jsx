import { createContext, useState } from "react";

export const LoginContext = createContext({});

//armazenar informações do login, email e senha
export function LoginContextProvider({ children }) {
  const [login, setLogin] = useState({});

  function handleLogin(dados) {
    setLogin(dados);
  }

  return (
    <LoginContext.Provider
      value={{
        login,
        handleLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
