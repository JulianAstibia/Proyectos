import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import PrivateRouter from "./components/PrivateRouter"
import IniciandoServidorToast from "./components/IniciandoBackend"

import Inicio from "./pages/Inicio"
import Favoritas from "./pages/Favoritas"
import Historial from "./pages/Historial"
import Login from "./pages/Login"
import Registrarse from "./pages/Registrarse"
import Forgot from "./pages/Forgot"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <IniciandoServidorToast />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={ <Inicio />} />
            <Route path="/favoritas" element={
              <PrivateRouter>
                <Favoritas />
              </PrivateRouter>} />
            <Route path="/historial" element={
              <PrivateRouter>
                <Historial/>
              </PrivateRouter>} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Registrarse />} />
            <Route path="/forgot" element={ <Forgot />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;