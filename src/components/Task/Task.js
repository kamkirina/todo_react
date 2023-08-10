import "./Task.css";

const Task = ({ description, time }) => {
  return (
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>
        <span class="description">{description}</span>
        <span class="created">{time}</span>
      </label>
      <button class="icon icon-edit"></button>
      <button class="icon icon-destroy"></button>
    </div>
  );
};

export default Task;
