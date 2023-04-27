import { TodoItem } from './TodoItem';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export function TodoList({
  title,
  tasks,
  removeTask,
  changeFilter,
}: PropsType) {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button></button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} {...task} removeTask={removeTask} />
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            changeFilter('all');
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            changeFilter('active');
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            changeFilter('completed');
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
