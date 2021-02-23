import jwtDecode from 'jwt-decode'
import http from '../http'
import { getCookie } from '../utils'
import { user, todoStatus, todos, error } from '../store'
import { setCookie } from '../utils'

const cookieName = 'todo-auth.token'

export function loginUser(res) {
  const token = res.headers.authorization_token
  setCookie(cookieName, token, 15) // Expire in 15 days
  user.set(res.data)
  getInitalTodos(token, res.data.todoID)
}

export async function getInitalTodos(token, todoID) {
  try {
    todoStatus.set({ error: false, isLoading: true })
    const result = await http.get(`/todo/${todoID}`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    todoStatus.set({ error: false, isLoading: false })
    todos.set(result.data)
  } catch (err) {
    if (err.response.status === 401) error.set('Unauthorized user')

    todoStatus.set({ error: true, isLoading: false })
  }
}

export function getToken() {
  return getCookie(cookieName)
}

export function logoutUser() {
  document.cookie = `${cookieName}=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`
  user.set(null)
  todos.set([])
}

export function getCurrentUser() {
  try {
    const token = getToken()
    return jwtDecode(token)
  } catch (_) {
    return null
  }
}

export async function session() {
  const currentUser = getCurrentUser()

  if (!currentUser) return

  user.set(currentUser)
  return getInitalTodos(getToken(), currentUser.todoID)
}
