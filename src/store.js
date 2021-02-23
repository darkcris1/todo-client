import { writable } from 'svelte/store'
import { saveTodo } from './services/socket'

const user = writable(null)
const error = writable('')
const theme = writable('light')
const todos = writable([])
const todoStatus = writable({ error: false, isLoading: false })

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
export { theme, user, todoDispatch, todos, error, todoStatus }
