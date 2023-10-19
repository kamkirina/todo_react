import Task from '../Task'
import './TaskList.css'

const TaskList = ({ todos, onDeleted, onTaskEdit, onToggleDone, onToggleEdit, editTimer }) => {
  const elements = todos.map((el) => {
    const { id } = el
    return (
      <Task
        {...el}
        key={id}
        onToggleEdit={() => onToggleEdit(id)}
        onTaskEdit={(text) => onTaskEdit(id, text)}
        editTimer={(timer) => editTimer(id, timer)}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    )
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
