import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import Statistics from './components/Statistics';
import './App.css';
import './styles/Navigation.css';
import { generateDummyTasks } from './utils/testData';


function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return generateDummyTasks(1000); 
    }
  });
 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <nav className="navigation">
          <ul>
            <li><Link to="/">All Tasks</Link></li>
            <li><Link to="/completed">Completed Tasks</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <TaskForm addTask={addTask} />
                <TaskList 
                  tasks={pendingTasks} 
                  toggleComplete={toggleComplete} 
                  deleteTask={deleteTask} 
                  updateTask={updateTask}
                />
              </>
            } />
            <Route path="/completed" element={
              <CompletedTasks 
                tasks={completedTasks} 
                toggleComplete={toggleComplete} 
                deleteTask={deleteTask}
              />
            } />
            <Route path="/statistics" element={
              <Statistics 
                totalTasks={tasks.length}
                pendingTasks={pendingTasks.length}
                completedTasks={completedTasks.length}
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;