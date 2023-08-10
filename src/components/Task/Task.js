import { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  state = {
    completed: false,
    editing: false,
  };

  oncheckboxClick = () => {
    this.setState((state) => {
      return {
        completed: !state.completed,
      };
    });
  };

  onEditClick = () => {
    this.setState({
      editing: true,
    });
  };

  render() {
    const { description, time } = this.props;
    const { completed, editing } = this.state;

    let liClassName = "";
    if (completed) {
      liClassName = "completed";
    }

    if (editing) {
      liClassName = "editing";
      return <input type="text" class="edit" value="Editing task" />;
    }

    return (
      <li className={liClassName}>
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            onClick={this.oncheckboxClick}
          />
          <label>
            <span class="description">{description}</span>
            <span class="created">{time}</span>
          </label>
          <button class="icon icon-edit" onClick={this.onEditClick}></button>
          <button class="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}
