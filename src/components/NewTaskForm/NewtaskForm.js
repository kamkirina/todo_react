import { Component } from "react";
import "../NewTaskForm/NewTaskForm.css";

export default class NewTask extends Component {
  state = {
    description: "",
  };

  onTaskAdded = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  onSubmit = (event) => {
    if (
      event.key === "Enter" ||
      (event.type === "blur" && this.state.description !== "")
    ) {
      this.props.onTaskAdded(this.state.description);
      this.setState({
        description: "",
      });
    }
  };
  render() {
    return (
      <input
        className="new-todo"
        onChange={this.onTaskAdded}
        onKeyUp={this.onSubmit}
        onBlur={this.onSubmit}
        placeholder="What needs to be done?"
        value={this.state.description}
        autoFocus
      />
    );
  }
}
