export function TodoItem({ isDone, title }: any) {
  return (
    <li>
      <input type="checkbox" checked={isDone} />
      <span>{title}</span>
    </li>
  );
}
