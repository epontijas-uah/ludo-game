import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isLoggedIn: (state) => !!state.usuario,
    isAdmin: (state) => state.usuario?.rol === 'ADMIN',
    usuarioId: (state) => state.usuario?.id
  },
  actions: {
    login(usuario, token) {
      this.usuario = usuario
      this.token = token
      localStorage.setItem('usuario', JSON.stringify(usuario))
      localStorage.setItem('token', token)
    },
    logout() {
      this.usuario = null
      this.token = null
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
    }
  }
})