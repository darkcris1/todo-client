import axios from 'axios'
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8700'
    : 'https://etodos.herokuapp.com'

axios.interceptors.response.use((res) => {
  const { status } = res
  if (status !== 401 && status !== 400 && status === 500) {
    error.set('Unexpect Error Occured')
  }
  return res
})

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true

export default axios
