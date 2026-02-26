
export function redirect(redirect_url){
    window.location.href = redirect_url
}

export function getOrCreateErrorContainer(form, className= 'form-error'){
    let container = form.querySelector(`.${className}`)

    if (!container){
        container = document.createElement("div")
        container.className = `alert alert-danger mt-3 ${className} d-none`
        form.appendChild(container)
    }
    
    return container
}

export function showError(container, message) {
    container.textContent = message
    container.classList.remove("d-none")
}

export function clearError(container) {
    container.classList.add("d-none")
}