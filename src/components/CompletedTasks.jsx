import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import TaskItem from './TaskItem';
import '../styles/CompletedTasks.css';

function CompletedTasks({ tasks, toggleComplete, deleteTask }) {
  const ITEM_HEIGHT = 120;
  const [listHeight, setListHeight] = useState(400);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const availableHeight = window.innerHeight - rect.top - 40;
      setListHeight(Math.max(300, availableHeight));
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const availableHeight = window.innerHeight - rect.top - 40;
        setListHeight(Math.max(300, availableHeight));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderRow = ({ index, style }) => {
    const task = tasks[index];
    return (
      <div style={style} className="virtualized-task-item">
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={() => {}} 
        />
      </div>
    );
  };

  return (
    <div className="completed-tasks-container" ref={containerRef}>
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No completed tasks yet.</p>
      ) : (
        <List
          className="task-list virtualized"
          height={listHeight}
          itemCount={tasks.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
          overscanCount={5}
        >
          {renderRow}
        </List>
      )}
    </div>
  );
}

export default CompletedTasks;