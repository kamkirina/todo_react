import Task from "../Task";
import "./TaskList.css";

const TaskList = ({ todos, onDeleted }) => {
  const elements = [];
  todos.forEach((el) => {
    const { id } = el;
    elements.push(<Task {...el} onDeleted={() => onDeleted(id)} />);
    return elements;
  });
  return <ul class="todo-list">{elements}</ul>;
};

export default TaskList;
