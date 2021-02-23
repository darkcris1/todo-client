import { io } from 'socket.io-client'
import { getToken } from './auth'
import { todos } from '../store'

const socketURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8700'
    : 'https://etodos.herokuapp.com'

const socket = io(socketURL, {
  transports: ['websocket'],
})

export function saveTodo() {
  // Access The data
  todos.update((data) => {
    socket.emit('save-todo', { token: getToken(), data }, (err) => {
      if (err) return error.set('Unauthorize user')
    })
    return data
  })
}
