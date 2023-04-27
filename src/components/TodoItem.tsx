import { ChangeEvent } from 'react';

type ItemType = {
  id: string;
  title: string;
  isDone: boolean;
  removeTask: Function;
  changeStatus: (taskId: string, isDone: boolean) => void;
  key: string;
};

export function TodoItem({
  isDone,
  id,
  title,
  removeTask,
  changeStatus,
}: ItemType) {
  const onRemoveTaskHandler = () => removeTask(id);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked);
  };

  return (
    <li className={isDone ? 'is-done' : ''}>
      <input type="checkbox" onChange={onChangeHandler} checked={isDone} />
      <span>{title}</span>
      <button onClick={onRemoveTaskHandler}>X</button>
    </li>
  );
}
