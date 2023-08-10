import Task from "../Task";
import "./TaskList.css";

const TaskList = ({ todos }) => {
  const elements = [];
  todos.forEach((el) => {
    console.log(el);
    elements.push(<Task {...el} />);
    return elements;
  });
  console.log(elements);
  return <ul class="todo-list">{elements}</ul>;
};

export default TaskList;
