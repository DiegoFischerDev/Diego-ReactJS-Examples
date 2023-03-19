// ********************* App.js *****************

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cursos from "./paginas/Cursos";
import Home from "./paginas/Home";
import Consultoria from "./paginas/Consultoria";
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import Login from "./paginas/Login";
import GlobalVariables from "./contexts";
import Curso from "./paginas/Curso";

const App = () => {
  return (
    <GlobalVariables>
      <BrowserRouter>
        <Cabecalho />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/consultoria" element={<Consultoria />} />
          <Route path="/login" element={<Login />} />
          <Route path="/curso" element={<Curso />} />
        </Routes>
        <Rodape />
      </BrowserRouter>
    </GlobalVariables>
  );
}

// export default App;



// **************** context.js *****************************

import { createContext, useEffect, useState } from "react";

export const globalContext = createContext();

const GlobalVariables = ({ children }) => {

  const [active, setActive] = useState("");
  const handleClick = event => setActive(event.target.name);
  const [userName, setUserName] = useState('Login');
  const [cursoSelecionado, setCursoSelecionado] = useState("Diego");

  return (
    <globalContext.Provider value={{ handleClick, active, setActive, userName, setUserName, cursoSelecionado, setCursoSelecionado }}>
      {children}
    </globalContext.Provider>
  )
}

// export default GlobalVariables;


// ********************* component ***************************

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../contexts";
import './ComponentesStyles.css'

const Cabecalho = () => {

  const { handleClick, active, userName, setCursoSelecionado } = useContext(globalContext)

  return (
    <>{userName}</>
  )
}

// export default Cabecalho;