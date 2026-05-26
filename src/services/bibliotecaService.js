import api from './api'

// GET /api/biblioteca/:usuarioId
export const getBibliotecaUsuario = (usuarioId) =>
  api.get(`/biblioteca/${usuarioId}`)

// POST /api/biblioteca/agregar?usuarioId=X&juegoId=Y&plataformaId=Z
export const agregarJuegoABiblioteca = (usuarioId, juegoId, plataformaId) =>
  api.post('/biblioteca/agregar', null, { params: { usuarioId, juegoId, plataformaId } })

// PUT /api/biblioteca/actualizar?usuarioId=X&juegoId=Y&plataformaId=Z
export const actualizarEstadoJuego = (usuarioId, juegoId, plataformaId, estado, esFavorito) =>
  api.put('/biblioteca/actualizar', null, {
    params: { usuarioId, juegoId, plataformaId, nuevoEstado: estado, esFavorito }
  })

// DELETE /api/biblioteca/eliminar?usuarioId=X&juegoId=Y&plataformaId=Z
export const eliminarJuegoDeBiblioteca = (usuarioId, juegoId, plataformaId) =>
  api.delete('/biblioteca/eliminar', { params: { usuarioId, juegoId, plataformaId } })