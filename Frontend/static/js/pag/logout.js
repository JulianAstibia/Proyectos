import { logout } from "../services/auth-service.js"

document.addEventListener("DOMContentLoaded", ()=>{
    const btn = document.getElementById("logoutBtn")

    if (!btn) return

    btn.addEventListener("click", async (event)=>{
        event.preventDefault()

        await logout()
        
        window.location.href = "/"
    })
})