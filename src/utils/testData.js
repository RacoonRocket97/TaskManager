// src/utils/testData.js
export function generateDummyTasks(count = 1000) {
    const priorities = ['low', 'medium', 'high'];
    const tasks = [];
    
    const getRandomDate = () => {
      const start = new Date();
      start.setDate(start.getDate() - 30);
      const end = new Date();
      end.setDate(end.getDate() + 30);
      
      const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return randomDate.toISOString().split('T')[0]; 
    };
    
    for (let i = 1; i <= count; i++) {
      const completed = Math.random() > 0.7; 
      tasks.push({
        id: Date.now() + i,
        name: `Task ${i}: ${completed ? 'Completed' : 'Pending'} Task with ${
          priorities[Math.floor(Math.random() * priorities.length)]
        } priority`,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        deadline: Math.random() > 0.2 ? getRandomDate() : '', 
        completed: completed
      });
    }
    
    return tasks;
  }