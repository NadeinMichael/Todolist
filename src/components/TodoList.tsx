import { TodoItem } from './TodoItem';
import { FilterValuesType } from '../App';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
};

export function TodoList({
  id,
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  filter,
  removeTodoList,
}: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const OnPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addNewTask();
      setNewTaskTitle('');
    }
  };

  const addNewTask = () => {
    if (newTaskTitle.trim().length) {
      addTask(newTaskTitle.trim(), id);
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onAllTasksClickHandler = () => changeFilter('all', id);

  const onActiveTasksClickHandler = () => changeFilter('active', id);

  const onCompletedTasksClickHandler = () => changeFilter('completed', id);
  const onRemoveTodoList = () => {
    removeTodoList(id);
  };

  return (
    <div>
      <h3>
        {title} <button onClick={onRemoveTodoList}>X</button>
      </h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={OnPressHandler}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            {...task}
            removeTask={removeTask}
            changeStatus={changeStatus}
            todoListId={id}
          />
        ))}
      </ul>
      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={onAllTasksClickHandler}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveTasksClickHandler}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedTasksClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
