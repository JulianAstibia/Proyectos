import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const FormLogin = () => {
    const [ form, setForm] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const { loginUser } = useAuth()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setErrors({})
        setGeneralError("")
        setSuccess("")

        try {
            await loginUser(form.email, form.password)
            setSuccess("Iniciando sesión")
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }catch(err){
            if (err instanceof Error) setGeneralError(err.message) 
            else {
                setErrors(err)
                if (err.general) setGeneralError(err.general)
            }
        }
    }   
    return(
        <form className="fs-4" onSubmit={handleSubmit}>
            {generalError && (
                <div className="alert alert-danger fs-6">
                    {generalError}
                </div>
            )}
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    className={`form-control fs-6 ${errors.email ? "is-invalid" : ""}`}
                    type="email"
                    required
                    name="email"
                    placeholder="Ingresar email"
                    onChange={handleChange}
                />
                {errors.email && (
                    <div className="invalid-feedback">
                        {errors.email[0]}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                    className={`form-control fs-6 ${errors.password ? "is-invalid" : ""}`}
                    type="password"
                    required
                    name="password"
                    placeholder="Ingresar Contraseña"
                    onChange={handleChange}
                />
                {errors.password && (
                    <div className="invalid-feedback">
                        {errors.password[0]}
                    </div>
                )}
            </div>

            
            <button className="btn btn-primary w-100 mt-2 fs-4" type="submit">
              Iniciar Sesión
            </button>
            {success && (
                <div className="alert alert-success fs-6">
                    {success}
                </div>
            )}
            <div className="mt-3 d-flex justify-content-between">
              <Link to="/register" className="btn btn-secondary btn-sm fs-6">
                Registrarse
              </Link>
              <Link to="/forgot" className="btn btn-link btn-sm fs-6">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
        </form>
    )
} 

export default FormLogin