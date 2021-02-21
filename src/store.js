import { writable } from 'svelte/store'
import http from './http'
import { io } from 'socket.io-client'

const AUTH_KEY = 'TODO_KEY'

const user = writable(null)
const error = writable('')
const theme = writable('light')
const todos = writable([])

const socketURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8700'
    : 'etodos.herokuapp.com'

const socket = io(socketURL, {
  transports: ['websocket'],
})

export async function loginUser(res) {
  sessionStorage.setItem(AUTH_KEY, res.headers.authorization_token)
  user.set(res.data)
  try {
    const result = await http.get(`/todo/${res.data.todoID}`, {
      headers: {
        authorization: 'Bearer ' + res.headers.authorization_token,
      },
    })

    todos.set(result.data)
  } catch (err) {
    if (err.response.status === 401)
      error.set('Invalid Token Please Login Again')
  }
}

export async function session() {
  try {
    const res = await http.get('/auth/session')
    loginUser(res)
  } catch (_) {}
}
function saveTodo() {
  const authToken = sessionStorage.getItem(AUTH_KEY)

  // Access The data
  todos.update((data) => {
    socket.emit('save-todo', { token: authToken, data }, (err) => {
      if (err) return error.set('asdasd')
    })
    return data
  })
}

function todoDispatch({ action, item }) {
  switch (action) {
    case 'DONE':
    case 'UNDO':
      todos.update((data) => {
        data[data.indexOf(item)].complete = action === 'UNDO' ? false : true
        return data
      })
      break
    case 'DELETE':
      todos.update((data) => data.filter((todo) => todo !== item))
      break
    case 'EDIT':
    case 'ADD':
      todos.update((data) => [item, ...data])
      break
    case 'DELETE_COMPLETED_TODO':
      todos.update((data) => data.filter((todo) => !todo.complete))
      break
    case 'DELETE_ALL_TODOS':
      todos.update((data) => data.filter((todo) => todo.complete))
      break
  }
  if (action !== 'EDIT') saveTodo()
}
export { theme, user, todoDispatch, todos, error }
