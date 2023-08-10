import { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  render() {
    const { description, time } = this.props;
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
  }
}
