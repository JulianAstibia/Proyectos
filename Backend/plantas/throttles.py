from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

class BusquedaAnonimoThrottle(AnonRateThrottle):
    scope = "busquedas_anon"

class BusquedaUsuarioThrottles(UserRateThrottle):
    scope = "busquedas_user"