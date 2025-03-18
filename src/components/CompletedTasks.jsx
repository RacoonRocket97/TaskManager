import React from 'react';
import TaskItem from './TaskItem';
import '../styles/CompletedTasks.css';
                                     
function CompletedTasks({ tasks, toggleComplete, deleteTask }) {
  return (
    <div className="completed-tasks-container">
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No completed tasks yet.</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={() => {}} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;