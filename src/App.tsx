import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Redax', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(currentId: number) {
    const filtredTasks = tasks.filter((task) => task.id !== currentId);
    setTasks(filtredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
