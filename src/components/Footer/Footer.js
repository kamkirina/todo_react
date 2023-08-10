import { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer class="footer">
        <span class="todo-count">1 items left</span>
        <ul class="filters">
          <li>
            <button class="selected">All</button>
          </li>
          <li>
            <button>Active</button>
          </li>
          <li>
            <button>Completed</button>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    );
  }
}
