import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, toggleComplete, deleteTask, updateTask }) {
  const ITEM_HEIGHT = 120;
  
  const [listHeight, setListHeight] = useState(400);
  
  const containerRef = React.useRef(null);
  
  React.useEffect(() => {
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
          updateTask={updateTask}
        />
      </div>
    );
  };

  return (
    <div className="task-list-container" ref={containerRef}>
      <h2>Pending Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No pending tasks available.</p>
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

export default TaskList;