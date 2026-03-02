import { APP_CONFIG, DEFAULT_HEADERS } from "./config.js"
import { getAccessToken } from "./services/token-service.js"
import { refreshAccessToken } from "./services/auth-service.js"

export async function apiRequest(endpoint, method= 'GET', data= null){
    const token = getAccessToken()
    const headers = { ...DEFAULT_HEADERS}

    if (token){
        headers['Authorization'] = `Bearer ${token}`
    }

    const options = {
        method,
        headers
    }

    if (data) {
        options.body = JSON.stringify(data)
    }

    let response = await fetch(`${APP_CONFIG.BASE_URL}${endpoint}`, options)

    if (response.status === 401){
        try {
            const newAccess = await refreshAccessToken()

            headers["Authorization"] = `Bearer ${newAccess}`
            options.headers = headers

            response = await fetch(`${APP_CONFIG.BASE_URL}${endpoint}`, options)
        }catch (error){
            throw new Error("La sesión expiró.")
        }
    }

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
}