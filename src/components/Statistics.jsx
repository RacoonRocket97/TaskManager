import React from 'react';
import '../styles/Statistics.css';

function Statistics({ totalTasks, pendingTasks, completedTasks }) {
  const completionPercentage = totalTasks === 0 
    ? 0 
    : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="statistics-container">
      <h2>Task Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Tasks</h3>
          <p className="stat-number">{totalTasks}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending Tasks</h3>
          <p className="stat-number">{pendingTasks}</p>
        </div>
        <div className="stat-card completed">
          <h3>Completed Tasks</h3>
          <p className="stat-number">{completedTasks}</p>
        </div>
        <div className="stat-card percentage">
          <h3>Completion Rate</h3>
          <p className="stat-number">{completionPercentage}%</p>
        </div>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">{completionPercentage}% Complete</p>
      </div>
    </div>
  );
}

export default Statistics;