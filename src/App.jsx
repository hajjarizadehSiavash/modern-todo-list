import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks_v1");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = inputValue.trim();
    if (!v) return;
    setTasks((prev) => [...prev, { text: v, completed: false }]);
    setInputValue("");
  };

  const toggleComplete = (index) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => setTasks([]);

  return (
    <div className="todo-container">
      <h1 className="title">Modern-ToDo-List</h1>

      <form className="input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        <button type="button" className="clear-all-btn" onClick={clearAll}>
          Delete All
        </button>

        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span className="task-text">{task.text}</span>

            <div className="actions">
              <button
                type="button"
                className="complete-btn"
                onClick={() => toggleComplete(index)}
              >
                ✓
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      <footer className="footer">© 2025 Modern-ToDo-List</footer>

      
    </div>
  );
}

export default App;
