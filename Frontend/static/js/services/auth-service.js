import { apiRequest } from "../api.js"
import { ENDPOINT } from "../config.js"
import { setAccessToken } from "./token-service.js"

export async function login(email, password) {
    const data = await apiRequest(
        ENDPOINT.AUTH.LOGIN,
        "POST",
        {email, password}
    )

    // Guardamos el access token
    setAccessToken(data.access)
    return data
}

export function register(username, email, password, password2) {
    return apiRequest(
        ENDPOINT.AUTH.REGISTER,
        "POST",
        { username, email, password, password2 }
    )
}
