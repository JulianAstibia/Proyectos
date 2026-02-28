import { register } from "../services/auth-service.js"
import { redirect, showError, clearError, getOrCreateErrorContainer } from "../utils/dom-utils.js"

// Constantes
const redirect_url = "/login/"
const error_messages = {
    REQUIRED_FIELDS: 'Todos los campos son obligatorios',
    REQUIRED_IDENTICAL_PASSWORDS: 'No coinciden los passwords.',
    ERROR_TRY_AGAIN: 'Ocurrio un error intentelo de nuevo.'
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
    const errorContainer = getOrCreateErrorContainer(form)

    clearError(errorContainer)

    const {username, email, password, password2} = Object.fromEntries(new FormData(form))

    if (!username || !email || !password || !password2 ){
        return showError(errorContainer, error_messages.REQUIRED_FIELDS)
    } else if(password != password2 ){
        return showError(errorContainer, error_messages.REQUIRED_IDENTICAL_PASSWORDS)
    }
    
    try {
        await register(
            username.trim(), email.trim(), password.trim(), password2.trim()
            )
            redirect(redirect_url)
    } catch (error) {
        showError(errorContainer,  error_messages.ERROR_TRY_AGAIN)
    }
}

// Funciones