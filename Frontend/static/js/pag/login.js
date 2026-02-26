import { login } from "../services/auth-service.js"
import { redirect, getOrCreateErrorContainer, showError, clearError } from "../utils/dom-utils.js"

// Constantes
const redirect_url = "/home/"
const error_messages = {
    REQUIRED_FIELDS: 'Todos los campos son obligatorios',
    INVALID_CREDENTIALS: 'Credenciales inválidas'
}

// Inicializacion
document.addEventListener("DOMContentLoaded", init)

function init() {
    const form = document.getElementById("loginForm")
    form.addEventListener("submit", handleSubmit)
}

// Lógica Principal
async function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const errorContainer = getOrCreateErrorContainer(form)

    clearError(errorContainer)

    const {email, password} = Object.fromEntries(new FormData(form))

    if (!email || !password) {
        return showError(errorContainer, error_messages.REQUIRED_FIELDS)
    }

    try {
        await login(email.trim(), password.trim())
        redirect(redirect_url)
    } catch (error) {
        showError(errorContainer, error_messages.INVALID_CREDENTIALS)
    }
}

// Funciones

// function getOrCreateErrorContainer(form){
//     let container = form.querySelector(".login-error")

//     if (!container){
//         container = document.createElement("div")
//         container.className = "alert alert-danger mt-3 login-error d-none"
//         form.appendChild(container)
//     }
    
//     return container
// }

// function showError(container, message) {
//     container.textContent = message
//     container.classList.remove("d-none")
// }

// function clearError(container) {
//     container.classList.add("d-none")
// }