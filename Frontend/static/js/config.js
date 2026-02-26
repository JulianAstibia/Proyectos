
const ENV = "desarrollo"

const CONFIG = {
    'desarrollo': {
        'BASE_URL': 'http://127.0.0.1:8000/api/',
        'DEBUG': true
    },
    'produccion': {
        'BASE_URL': 'https//midominio.com',
        'DEBUG': false
    }
}

export const APP_CONFIG = CONFIG[ENV]

export const DEFAULT_HEADERS = {
    "Content-Type": "application/json"
}

export const ENDPOINT = {
    AUTH : {
        LOGIN : 'login/',
        REGISTER : 'register/',
        REFRESH : 'refresh/',
        LOGOUT : 'logout/'
    },
    USER : {
        ME : 'me/',
        UPDATE : 'me/update/',
        CHANGE_PASSWORD : 'change-password/'
    }
}
