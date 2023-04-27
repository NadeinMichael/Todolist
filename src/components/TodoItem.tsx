type ItemType = {
  id: number;
  title: string;
  isDone: boolean;
  removeTask: Function;
  key: number;
};

export function TodoItem({ isDone, id, title, removeTask }: ItemType) {
  return (
    <li>
      <input type="checkbox" checked={isDone} />
      <span>{title}</span>
      <button onClick={() => removeTask(id)}>X</button>
    </li>
  );
}
