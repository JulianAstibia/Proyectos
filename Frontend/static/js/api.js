import { APP_CONFIG, DEFAULT_HEADERS } from "./config.js"
import { getAccessToken } from "./services/token-service.js"

export async function apiRequest(endpoint, method= 'GET', data= null){
    const token = getAccessToken()
    const headers = DEFAULT_HEADERS

    if (token){
        headers['Authorization'] = `Bearer ${token}`
    }

    const option = {
        method,
        headers
    }

    if (data) {
        option.body = JSON.stringify(data)
    }

    const response = await fetch(`${APP_CONFIG.BASE_URL}${endpoint}`,
        option
    )

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }

    return response.json
}