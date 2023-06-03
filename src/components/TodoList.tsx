import { TodoItem } from './TodoItem';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
  changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
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
  changeTaskTitle,
  changeTodoListTitle,
}: PropsType) {
  const onAllTasksClickHandler = () => changeFilter('all', id);

  const onActiveTasksClickHandler = () => changeFilter('active', id);

  const onCompletedTasksClickHandler = () => changeFilter('completed', id);

  const onRemoveTodoList = () => {
    removeTodoList(id);
  };

  const onChangeTodoListTitle = (newTitle: string) => {
    changeTodoListTitle(id, newTitle);
  };

  const addNewTask = (title: string) => {
    addTask(title, id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={onChangeTodoListTitle} />{' '}
        <button onClick={onRemoveTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addNewTask} />
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            {...task}
            removeTask={removeTask}
            changeStatus={changeStatus}
            todoListId={id}
            changeTaskTitle={changeTaskTitle}
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
