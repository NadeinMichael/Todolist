import { ChangeEvent } from 'react';

type ItemType = {
  id: string;
  title: string;
  isDone: boolean;
  removeTask: Function;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  key: string;
  todoListId: string;
};

export function TodoItem({
  isDone,
  id,
  title,
  removeTask,
  changeStatus,
  todoListId,
}: ItemType) {
  const onRemoveTaskHandler = () => removeTask(id, todoListId);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked, todoListId);
  };

  return (
    <li className={isDone ? 'is-done' : ''}>
      <input type="checkbox" onChange={onChangeHandler} checked={isDone} />
      <span>{title}</span>
      <button onClick={onRemoveTaskHandler}>X</button>
    </li>
  );
}
