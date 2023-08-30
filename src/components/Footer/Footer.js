import { Component } from "react";
import "./Footer.css";
import TaskFilter from "../TasksFilter/TaskFilter";

export default class Footer extends Component {
  render() {
    const { doneCount, clearCompleted, filter, onFilterChange } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
