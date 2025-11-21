import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleDone = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    ));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`task-item ${task.isDone ? 'done' : ''}`}
          >
            <span onClick={() => handleToggleDone(task.id)}>
              {task.text}
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p className="no-tasks">No tasks yet!</p>}
    </div>
  );
}

export default TodoList;
