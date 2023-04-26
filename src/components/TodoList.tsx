import { TodoItem } from './TodoItem';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

export function TodoList({ title, tasks }: PropsType) {
  console.log(tasks);

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button></button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} {...task} />
        ))}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Complited</button>
      </div>
    </div>
  );
}
