# 🌱 Plant ID - Buscador e Identificador de Plantas

Aplicación web full stack desarrollada con **Django REST Framework** y **React (Vite)** que permite buscar e identificar plantas, explorar información detallada sobre miles de especies y gestionar favoritos mediante autenticación segura.

El proyecto integra APIs externas para la búsqueda e identificación de plantas, traducción automática al español y una base de datos PostgreSQL alojada en **Neon**.

---

## ✨ Funcionalidades

- 🔍 Búsqueda de plantas por nombre.
- 📷 Identificación de plantas mediante imágenes.
- 🌿 Visualización de información detallada de cada especie.
- ⭐ Gestión de plantas favoritas.
- 🔐 Registro e inicio de sesión mediante JWT.
- 📱 Diseño responsive para escritorio y dispositivos móviles.
- 🚫 Protección contra abuso mediante throttling en la API.

---

## 🚀 Tecnologías utilizadas

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- PostgreSQL
- deep-translator

### Frontend

- React
- Vite
- JavaScript
- Bootstrap

### Infraestructura y servicios

- Neon (PostgreSQL Serverless)
- Perenual API
- PlantNet API
- Git & GitHub

---

## 🧠 Arquitectura

La aplicación sigue una arquitectura cliente-servidor.

- El backend expone una API REST desarrollada con Django REST Framework.
- La autenticación se realiza mediante JSON Web Tokens (JWT).
- El frontend consume la API utilizando React.
- La información de plantas proviene de APIs externas.
- Los usuarios, favoritos y datos propios de la aplicación se almacenan en PostgreSQL (Neon).

---

## 📸 Capturas

### 🔐 Inicio de sesión

![Login](./screenshots/login.png)

### 🔍📷  Búsqueda de plantas e Identificación mediante imágenes

![Busqueda](./screenshots/buscar_identificar.png)

### ⭐ Favoritos

![Favoritos](./screenshots/favoritos.png)

---

## 🌐 Demo

Frontend:

https://p-api-plantas.vercel.app/

Backend:

https://p-api-plantas.onrender.com/

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/JulianAstibia/P-API-Plantas.git

cd P-API-Plantas
```

---

### 2. Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

### 3. Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Variables de entorno

Crear un archivo `.env` en el backend con las siguientes variables:

```env
SECRET_KEY=tu_secret_key

DEBUG=True

DATABASE_URL=postgresql://usuario:password@host/neondb?sslmode=require

PERENUAL_API_KEY=tu_api_key
PENENUAL_URL = "https://perenual.com/api/v2"

PLANTNET_API_KEY=tu_api_key
PLANTNET_URL = "https://my-api.plantnet.org"
```

> **Nota:** El proyecto utiliza **PostgreSQL** alojado en **Neon**, por lo que la conexión se realiza mediante la variable `DATABASE_URL`.

---

## 📌 Estado del proyecto

🚧 En desarrollo.

Actualmente se continúa trabajando en mejoras de experiencia de usuario, optimización del código y nuevas funcionalidades.

### Próximas mejoras

- Historial de búsquedas persistente.
- Mejoras adicionales de UI/UX.
- Optimización del rendimiento.
- Nuevas opciones de filtrado.

---

## 🎯 Objetivo

Este proyecto fue desarrollado como parte de mi portfolio personal para consolidar conocimientos en desarrollo Full Stack, aplicando buenas prácticas en:

- Diseño de APIs REST.
- Autenticación mediante JWT.
- Integración con APIs externas.
- Manejo de estado en React.
- Diseño responsive.
- Consumo y transformación de datos.
- Persistencia con PostgreSQL.

---

## 📄 Licencia

Proyecto desarrollado con fines educativos y como portfolio personal.