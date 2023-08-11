import { Component } from "react";
import { createRoot } from "react-dom/client";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import "./style.css";
const container = document.getElementById("root");
const root = createRoot(container);

const Header = () => {
  return (
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
  );
};

export default class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        completed: true,
        editing: false,
        description: "Completed task",
        time: "created 17 seconds ago",
      },
      {
        id: 2,
        completed: false,
        editing: true,
        description: "Editing task",
        time: "created 5 minutes ago",
      },
      {
        id: 3,
        completed: false,
        editing: false,
        description: "Active task",
        time: "created 5 minutes ago",
      },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newArr = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
      return {
        todos: newArr,
      };
    });
  };

  render() {
    return (
      <div className="todoapp">
        <Header />
        <section className="main">
          <TaskList todos={this.state.todos} onDeleted={this.deleteTask} />
          <Footer />
        </section>
      </div>
    );
  }
}

root.render(<App />);
