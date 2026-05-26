import api from './api'

export const getBiblioteca = (usuarioId) => api.get(`/jugador/biblioteca/${usuarioId}`)
export const agregarABiblioteca = (usuarioId, juegoId, plataformaId) =>
  api.post(`/jugador/biblioteca/agregar?usuarioId=${usuarioId}&juegoId=${juegoId}&plataformaId=${plataformaId}`)

export const getWishlist = (usuarioId) => api.get(`/jugador/wishlist/${usuarioId}`)
export const agregarAWishlist = (usuarioId, juegoId) =>
  api.post(`/jugador/wishlist/agregar?usuarioId=${usuarioId}&juegoId=${juegoId}`)

export const dejarValoracion = (usuarioId, juegoId, nota, comentario) =>
  api.post(`/jugador/valorar?usuarioId=${usuarioId}&juegoId=${juegoId}&nota=${nota}&comentario=${encodeURIComponent(comentario)}`)

export const enviarIncidencia = (correo, descripcion) =>
  api.post(`/jugador/soporte/contacto?correo=${encodeURIComponent(correo)}&descripcion=${encodeURIComponent(descripcion)}`)