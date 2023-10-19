import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { formatDistanceToNow } from 'date-fns'

import TaskList from './components/TaskList'
import Footer from './components/Footer'
import './style.css'
import NewTask from './components/NewTask'

const container = document.getElementById('root')
const root = createRoot(container)
let maxId = 100
function App() {
  const createTask = (text, timer = 0) => {
    return {
      id: maxId++,
      completed: false,
      editing: false,
      description: text,
      time: formatDistanceToNow(Date.now(), { includeSeconds: true }),
      timer,
      checkTimer: false,
    }
  }
  const [todos, setTodos] = useState([
    createTask('Completed task'),
    createTask('Editing task'),
    createTask('Active task'),
  ])
  const [filter, setFilter] = useState('all')

  const deleteTask = (id) => {
    const newArr = todos.filter((el) => el.id !== id)
    setTodos(newArr)
  }

  const addTask = (text, timer) => {
    const newTask = createTask(text, timer)
    const newArr = [...todos, newTask]
    setTodos(newArr)
  }
  const changeFilter = (todos, filter) => {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }

  const clearCompleted = () => {
    const newArr = todos.filter((todo) => !todo.completed)
    setTodos(newArr)
  }

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  const onToggle = (arr, id, key) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [key]: !oldItem[key] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const editTask = (id, text) => {
    const idx = todos.findIndex((el) => el.id === id)
    const oldItem = todos[idx]
    const newItem = { ...oldItem, description: text }
    const newArr = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]
    setTodos(newArr)
  }

  const editTimer = (id, timer) => {
    const idx = todos.findIndex((el) => el.id === id)
    const oldItem = todos[idx]
    const newItem = { ...oldItem, timer }
    const newArr = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]
    setTodos(newArr)
  }

  const onToggleEdite = (id) => {
    const newArr = onToggle(todos, id, 'editing')
    setTodos(newArr)
  }

  const onToggleDone = (id) => {
    const newArr = onToggle(todos, id, 'completed')
    setTodos(newArr)
  }

  const doneCount = todos.filter((el) => !el.completed).length
  const visibleTodos = changeFilter(todos, filter)

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTask onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleTodos}
          onDeleted={deleteTask}
          onToggleEdit={onToggleEdite}
          onTaskEdit={editTask}
          onToggleDone={onToggleDone}
          editTimer={editTimer}
        />
        <Footer doneCount={doneCount} filter={filter} onFilterChange={onFilterChange} clearCompleted={clearCompleted} />
      </section>
    </div>
  )
}

root.render(<App />)
