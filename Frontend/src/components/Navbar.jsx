import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import logo from "../assets/logo.png"

const Navbar = () => {
  const navigate = useNavigate()
  const { isLogged, logout } = useAuth()

  const logo_planta = ()=> {
    return(
      <Link className="navbar-brand" to="/">
        <img
          src={logo}
          alt="Plantitas"
          className="logo"
          width="50"
          height="50"
          />
      </Link>
      )}

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        {logo_planta()}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"} >
                Inicio
              </Link>
            </li>
            { isLogged && (
                <li className="nav-item">
                  <Link className="nav-link" to={"/favoritas"}>
                    Plantas favoritas
                  </Link>
                </li>
            )}
            { isLogged && (
                <li className="nav-item">
                  <Link className="nav-link" to={"/historial"}>
                    Historial
                  </Link>
                </li>
            )}
            { isLogged && (
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Ajustes</a>
                </li>
            )}
            { !isLogged && (
                <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Registrarse</Link>
                </li>
            )}
          </ul>
          
          { isLogged ? (
            <button className="btn btn-outline-danger mx-2" onClick={()=> {
              logout()
              navigate("/")}
              }>Cerrar Sesión</button>
          ) : (
            <Link className="btn btn-outline-primary mx-2" to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
    )
}

export default Navbar