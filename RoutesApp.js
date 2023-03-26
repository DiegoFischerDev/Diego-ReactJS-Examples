import { BrowserRouter, Route, Routes } from "react-router-dom"
import Produto from "./paginas/Produto";
import Home from "./paginas/Home";
import Consultoria from "./paginas/Consultoria";
import Login from "./paginas/Login";
import Curso from "./paginas/Curso";
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import GlobalVariables from "./contexts";

const RoutesApp = () => {
  return (
    <GlobalVariables>
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Produto/:id" element={<Produto />} />
          <Route path="/consultoria" element={<Consultoria />} />
          <Route path="/login" element={<Login />} />
          <Route path="/curso" element={<Curso />} />

          <Route path="*" element={<Error />} />
        </Routes>
      <Footer />
    </BrowserRouter>
    </GlobalVariables>
  );
}

export default RoutesApp;
