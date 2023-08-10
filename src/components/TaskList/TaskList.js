import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { completed, editing, ...itemProps } = item;
    if (completed) {
      return (
        <li className="completed">
          <Task {...itemProps} />
        </li>
      );
    }
    if (editing) {
      return (
        <li className="editing">
          <Task {...itemProps} />
          <input type="text" class="edit" value="Editing task" />
        </li>
      );
    }
    return (
      <li>
        <Task {...itemProps} />
      </li>
    );
  });
  return <ul class="todo-list">{elements}</ul>;
};

export default TaskList;
