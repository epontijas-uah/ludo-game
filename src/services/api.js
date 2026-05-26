import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Cambia al puerto de tu Spring Boot
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para añadir token JWT cuando lo implementes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api