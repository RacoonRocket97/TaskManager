import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, toggleComplete, deleteTask, updateTask }) {
  return (
    <div className="task-list-container">
      <h2>Pending Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No pending tasks available.</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;