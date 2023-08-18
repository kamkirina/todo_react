import { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  render() {
    const { doneCount, filter, onFilterChange, clearCompleted } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? "selected" : "";
      return (
        <li key={name}>
          <button className={clazz} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <ul className="filters">{buttons}</ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
