import React, { useState, useEffect } from 'react';
import './TodoList.css';

const LOCAL_STORAGE_KEY = 'todoApp.tasks';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        return JSON.parse(storedTasks);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      isDone: false,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);
    setNewTaskText('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const handleToggleDone = (taskId) => {
    setTasks(currentTasks => currentTasks.map(task =>
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
