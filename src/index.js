import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import { formatDistanceToNow } from 'date-fns'

import TaskList from './components/TaskList'
import Footer from './components/Footer'
import './style.css'
import NewTask from './components/NewTaskForm/NewtaskForm'

const container = document.getElementById('root')
const root = createRoot(container)

export default class App extends Component {
  maxId = 100
  state = {
    todos: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    filter: 'all',
  }

  createTask(text) {
    return {
      id: this.maxId++,
      completed: false,
      editing: false,
      description: text,
      time: formatDistanceToNow(Date.now(), { includeSeconds: true }),
      timer: 0,
      intervalId: 0,
    }
  }

  deleteTask = (id) => {
    this.stopTimer(id)
    this.setState(({ todos }) => {
      const newArr = todos.filter((el) => el.id !== id)
      return {
        todos: newArr,
      }
    })
  }

  addTask = (text) => {
    const newTask = this.createTask(text)

    this.setState(({ todos }) => {
      const newArr = [...todos, newTask]
      return {
        todos: newArr,
      }
    })
  }
  filter(todos, filter) {
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

  clearCompleted = () => {
    this.setState(({ todos }) => {
      const newArr = todos.filter((todo) => !todo.completed)

      return {
        todos: newArr,
      }
    })
  }
  onFilterChange = (filter) => {
    this.setState({ filter })
  }
  onToggle = (arr, id, key) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]

    const newItem = { ...oldItem, [key]: !oldItem[key] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  editTask = (id, text) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)

      const oldItem = todos[idx]

      const newItem = { ...oldItem, description: text }

      const newArr = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]
      return {
        todos: newArr,
      }
    })
  }
  editTodo = (id, value) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)

      const oldItem = todos[idx]

      const newItem = { ...oldItem, intervalId: value }

      const newArr = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]
      return {
        todos: newArr,
      }
    })
  }

  onToggleEdite = (id) => {
    this.stopTimer(id)
    this.setState(({ todos }) => {
      return {
        todos: this.onToggle(todos, id, 'editing'),
      }
    })
  }

  onToggleDone = (id) => {
    this.stopTimer(id)
    this.setState(({ todos }) => {
      return {
        todos: this.onToggle(todos, id, 'completed'),
      }
    })
  }

  startTimer = (id) => {
    const interval = setInterval(() => {
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id)

        const oldItem = todos[idx]

        const newItem = { ...oldItem, timer: oldItem.timer + 1 }

        const newArr = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]

        return {
          todos: newArr,
        }
      })
    }, 1000)
    this.editTodo(id, interval)
  }

  stopTimer = (id) => {
    const idx = this.state.todos.findIndex((el) => el.id === id)
    const interval = this.state.todos[idx].intervalId
    clearInterval(interval)
    this.editTodo(id, 0)
  }

  render() {
    const { todos, filter } = this.state
    const doneCount = todos.filter((el) => !el.completed).length
    const visibleTodos = this.filter(todos, filter)

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTask onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleTodos}
            onDeleted={this.deleteTask}
            onToggleEdit={this.onToggleEdite}
            onTaskEdit={this.editTask}
            onToggleDone={this.onToggleDone}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            doneCount={doneCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </div>
    )
  }
}

root.render(<App />)
