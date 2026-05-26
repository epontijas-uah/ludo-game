import api from './api'

// GET /api/juegos/aprobados
export const getJuegosAprobados = () => api.get('/juegos/aprobados')

// GET /api/juegos/pendientes  (solo admin)
export const getJuegosPendientes = () => api.get('/juegos/pendientes')

// POST /api/juegos/proponer?usuarioId=X
export const proponerJuego = (juego, usuarioId) =>
  api.post(`/juegos/proponer?usuarioId=${usuarioId}`, juego)

// POST /api/juegos/oficial  (solo admin)
export const insertarJuegoOficial = (juego) => api.post('/juegos/oficial', juego)

// PUT /api/juegos/moderar/:id?aprobar=true|false  (solo admin)
export const moderarJuego = (id, aprobar) =>
  api.put(`/juegos/moderar/${id}?aprobar=${aprobar}`)

// GET /api/juegos/estadisticas/plataformas
export const getPlataformasConMayorCatalogo = () => api.get('/juegos/estadisticas/plataformas')

// GET /api/juegos/estadisticas/generos
export const getGenerosDestacados = () => api.get('/juegos/estadisticas/generos')

// GET /api/juegos/estadisticas/relevantes?inicio=...&fin=...
export const getJuegosMasRelevantes = (inicio, fin) =>
  api.get('/juegos/estadisticas/relevantes', { params: { inicio, fin } })

// GET /api/juegos/estadisticas/informe
export const getInformeEstadisticas = () => api.get('/juegos/estadisticas/informe')