import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8700'
    : 'https://etodos.herokuapp.com'

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (!expectedError) {
    error.set('An unexpected error occured.')
  }

  return Promise.reject(error)
})

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

export default axios
