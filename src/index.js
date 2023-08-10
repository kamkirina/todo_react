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

const App = () => {
  const todos = [
    {
      completed: true,
      editing: false,
      description: "Completed task",
      time: "created 17 seconds ago",
    },
    {
      completed: false,
      editing: true,
      description: "Editing task",
      time: "created 5 minutes ago",
    },
    {
      completed: false,
      editing: false,
      description: "Active task",
      time: "created 5 minutes ago",
    },
  ];

  return (
    <div className="todoapp">
      <Header />
      <section className="main">
        <TaskList todos={todos} />
        <Footer />
      </section>
    </div>
  );
};

root.render(<App />);
