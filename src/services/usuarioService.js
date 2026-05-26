import api from './api'

// POST /api/usuarios/registro
export const registrarUsuario = (datos) => api.post('/usuarios/registro', datos)

// GET /api/usuarios/perfil/:id
export const obtenerPerfilPorId = (id) => api.get(`/usuarios/perfil/${id}`)

// GET /api/usuarios/perfil/username/:username
export const obtenerPerfilPorUsername = (username) => api.get(`/usuarios/perfil/username/${username}`)

// POST /api/usuarios/login  ← necesitas añadir este endpoint en el backend
export const loginUsuario = (credenciales) => api.post('/usuarios/login', credenciales)