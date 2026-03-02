import { apiRequest } from "../api.js"
import { APP_CONFIG, ENDPOINT } from "../config.js"
import { setAccessToken, clearAccessToken , setRefreshToken, getRefreshToken, clearRefreshToken } from "./token-service.js"


export async function refreshAccessToken() {
    const refresh = getRefreshToken()

    if (!refresh){
        throw new Error("No se refresco el token")
    }

    const response = await fetch(`${APP_CONFIG.BASE_URL}${ENDPOINT.AUTH.REFRESH}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({refresh})
    })

    if (!response.ok){
        throw new Error("Refresh Fallido");
    }
    
    const data = await response.json()
    setAccessToken(data.access)

    return data.access
}

export async function login(email, password) {
    const data = await apiRequest(
        ENDPOINT.AUTH.LOGIN,
        "POST",
        {email, password}
    )

    // Guardamos el access token
    setAccessToken(data.access)
    setRefreshToken(data.refresh)
    return data
}

export function register(username, email, password, password2) {
    return apiRequest(
        ENDPOINT.AUTH.REGISTER,
        "POST",
        { username, email, password, password2 }
    )
}

export async function logout(){
    const refresh = getRefreshToken()

    if (!refresh){
        clearAccessToken()
        return
    }

    try{
        await apiRequest(
            ENDPOINT.AUTH.LOGOUT,
            "POST",
            {refresh}
        )
    }catch(error){
        console.error("Error al cerrar sesión:", error);
    }

    clearAccessToken()
    clearRefreshToken()
    
}