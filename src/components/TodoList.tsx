import { TodoItem } from './TodoItem';
import { FilterValuesType } from '../App';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function TodoList({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  filter,
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
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onAllTasksClickHandler = () => changeFilter('all');

  const onActiveTasksClickHandler = () => changeFilter('active');

  const onCompletedTasksClickHandler = () => changeFilter('completed');

  return (
    <div>
      <h3>{title}</h3>
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
