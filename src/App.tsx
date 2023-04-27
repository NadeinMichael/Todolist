import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redax', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(currentId: string) {
    const filteredTasks = tasks.filter((task) => task.id !== currentId);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    const newTask = { id: v1(), title: title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
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
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
