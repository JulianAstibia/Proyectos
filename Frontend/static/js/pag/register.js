import { register } from "../services/auth-service"

// Constantes
const redirect_url = "/login/"
const error_messages = {
    REQUIRED_FIELDS: 'Todos los campos son obligatorios',
}

// Inicializacion
document.addEventListener("DOMContentLoaded", init)

function init() {
    const form = document.getElementById("registerForm")
    form.addEventListener("submit", handleSubmit)
}
// Lógica Principal
async function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const errorContainer = get
}

// Funciones