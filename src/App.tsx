import { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function removeTask(currentId: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    const filteredTasks = tasks.filter((task) => task.id !== currentId);
    tasksObj[todoListId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    const newTask = { id: v1(), title: title, isDone: false };

    let tasks = tasksObj[todoListId];

    const newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    const todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];

    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    let tasks = tasksObj[todoListId];

    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({ ...tasksObj });
    }
  }

  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]);

  const removeTodoList = (todoListId: string) => {
    const filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists([...filteredTodoList]);

    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  };

  const changeTodoListTitle = (id: string, newTitle: string) => {
    const todoList = todoLists.find((tl) => tl.id === id);
    if (todoList) {
      todoList.title = newTitle;
    }

    setTodoLists([...todoLists]);
  };

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
    ],
  });

  function addTodoList(title: string) {
    const todoList: TodoListType = {
      id: v1(),
      filter: 'all',
      title,
    };
    setTodoLists([todoList, ...todoLists]);
    setTasksObj({ ...tasksObj, [todoList.id]: [] });
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((todo) => {
        let tasksForTodoList = tasksObj[todo.id];

        if (todo.filter === 'completed') {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === true
          );
        }
        if (todo.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === false
          );
        }

        return (
          <TodoList
            key={todo.id}
            id={todo.id}
            title={todo.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={todo.filter}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
