import Task from '../Task'
import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleEdit, onTaskEdit, onToggleDone }) => {
  const elements = []
  todos.forEach((el) => {
    const { id } = el
    elements.push(
      <Task
        {...el}
        key={id}
        onToggleEdit={() => onToggleEdit(id)}
        onTaskEdit={(text) => onTaskEdit(id, text)}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    )
    return elements
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onToggleEdit: () => {},
  onTaskEdit: () => {},
  onDeleted: () => {},
  onToggleDone: () => {},
}

export default TaskList
