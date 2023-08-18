import { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  state = {
    description: this.props.description,
  };
  onTaskEdit = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onEdit = (event) => {
    if (event.key === "Enter" || event.type === "blur") {
      // this.props.onTaskEdit(this.state.description);
      this.props.onTaskEdit(this.state.description);
      this.props.onToggleEdit();
    }
  };
  render() {
    const {
      completed,
      editing,
      description,
      time,
      onDeleted,
      onToggleDone,
      onToggleEdit,
    } = this.props;

    let liClassName = "";
    if (completed) {
      liClassName = "completed";
    }

    if (editing) {
      liClassName = "editing";
      return (
        <input
          type="text"
          className="edit"
          value={this.state.description}
          onChange={this.onTaskEdit}
          onKeyUp={this.onEdit}
          onBlur={this.onEdit}
        />
      );
    }
    return (
      <li className={liClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{description}</span>
            <span className="created">{time}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
