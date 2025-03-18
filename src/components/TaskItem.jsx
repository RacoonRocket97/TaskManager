import React, { useState } from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, toggleComplete, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(editedTask);
    setIsEditing(false);
  };

  const formattedDate = task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline';

  const priorityClass = `priority-${task.priority}`;

  return (
    <div className={`task-item ${priorityClass}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor={`edit-name-${task.id}`}>Task Name:</label>
            <input
              type="text"
              id={`edit-name-${task.id}`}
              name="name"
              value={editedTask.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor={`edit-priority-${task.id}`}>Priority:</label>
            <select
              id={`edit-priority-${task.id}`}
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor={`edit-deadline-${task.id}`}>Deadline:</label>
            <input
              type="date"
              id={`edit-deadline-${task.id}`}
              name="deadline"
              value={editedTask.deadline}
              onChange={handleChange}
            />
          </div>
          
          <div className="edit-buttons">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-details">
            <h3>{task.name}</h3>
            <div className="task-meta">
              <p><strong>Priority:</strong> <span className={`priority-tag ${priorityClass}`}>{task.priority}</span></p>
              <p><strong>Deadline:</strong> {formattedDate}</p>
            </div>
          </div>
          <div className="task-actions">
            <button 
              onClick={() => toggleComplete(task.id)} 
              className="btn-complete"
            >
              {task.completed ? 'Mark Incomplete' : 'Complete'}
            </button>
            <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;